import pg from 'pg';
import { getValidatedConfig, ConfigurationError } from '../config/env';

const { Pool } = pg;

/**
 * PostgreSQL Connection Pool Manager
 * Configured for Google Cloud SQL (asia-south1, Mumbai)
 * 
 * [Fail-Closed Enforcement]:
 * Throws ConfigurationError if DATABASE_URL is missing,
 * unless explicitly operating in sandbox test mode with ALLOW_DEV_FALLBACKS=true.
 */

let poolInstance: pg.Pool | null = null;

type TestQueryHandler = (text: string, params?: unknown[]) => Promise<{ rows: any[] }> | { rows: any[] } | null;
let testQueryHandler: TestQueryHandler | null = null;

/**
 * Clean Test Double Hook: allows automated tests to supply query results
 * without embedding test-support state inside production domain services.
 */
export function setTestQueryHandler(handler: TestQueryHandler | null): void {
  testQueryHandler = handler;
}

export function getDbPool(): pg.Pool {
  if (!poolInstance) {
    const config = getValidatedConfig();

    if (!config.databaseUrl && !config.allowSandbox) {
      throw new ConfigurationError(
        'DATABASE_URL',
        'PostgreSQL connection string is required. Fail-closed: database operations cannot proceed.'
      );
    }

    poolInstance = new Pool({
      connectionString: config.databaseUrl || 'postgresql://postgres:postgres@localhost:5432/sellmyghar_db',
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
      ssl: config.isProduction ? { rejectUnauthorized: true } : false,
    });
  }
  return poolInstance;
}

export const dbPool = getDbPool();

/**
 * Executes a parameterized query with strict fail-closed handling
 */
export async function executeQuery<T = any>(text: string, params?: unknown[]): Promise<{ rows: T[] }> {
  const config = getValidatedConfig();

  if (!config.databaseUrl && !config.allowSandbox) {
    throw new ConfigurationError(
      'DATABASE_URL',
      'Cannot execute query: DATABASE_URL is unset. Fail-closed: writes rejected.'
    );
  }

  // 1. Check test double handler if registered (for isolated unit testing)
  if (testQueryHandler) {
    const testResult = await testQueryHandler(text, params);
    if (testResult !== null) {
      return testResult as { rows: T[] };
    }
  }

  try {
    const pool = getDbPool();
    const res = await pool.query(text, params);
    return res as { rows: T[] };
  } catch (err: any) {
    if (!config.databaseUrl && config.allowSandbox) {
      console.info(`[PG SANDBOX SQL INTERCEPT - Dev Only] ${text.replace(/\s+/g, ' ')}`, params || []);
      return { rows: [] };
    }
    throw err;
  }
}
