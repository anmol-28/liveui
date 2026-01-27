import express from 'express';
import { pool } from '../db/pool.js';

const router = express.Router();

router.get('/live-state', async (req, res) => {
  try {
    const { org, region } = req.query;

    let query = `
      SELECT
        id,
        org,
        amount,
        region,
        source,
        event_time,
        updated_at
      FROM serving_live_state
    `;

    const values = [];
    const conditions = [];

    if (org) {
      values.push(org);
      conditions.push(`org = $${values.length}`);
    }

    if (region) {
      values.push(region);
      conditions.push(`region = $${values.length}`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    query += ` ORDER BY updated_at DESC LIMIT 100`;

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching live state:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
