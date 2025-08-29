// api/bfhl.js
module.exports = async (req, res) => {
  if (req.method === 'GET') {
    return res.status(200).json({ ok: true, hint: 'POST { "data": [...] } to this endpoint' });
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ is_success: false, error: 'Only POST allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch {
        return res.status(400).json({ is_success: false, error: 'Invalid JSON body' });
      }
    }
    if (!body || !Array.isArray(body.data)) {
      return res.status(400).json({ is_success: false, error: 'Body must be { "data": [...] }' });
    }
    const data = body.data;

    // YOUR DETAILS
    const FULL_NAME = 'pragya_batra';
    const DOB_DDMMYYYY = '01012002';
    const EMAIL = 'pragya.batra2026@vitstudent.ac.in';
    const ROLL  = '22BCE1234';

    const odd = [], even = [], alphabets = [], specials = [];
    let sum = 0, concatRaw = '';
    const toStr = v => typeof v === 'string' ? v : String(v);

    for (const raw of data) {
      const s = toStr(raw);
      const isNum   = /^-?\d+$/.test(s);
      const isAlpha = /^[A-Za-z]+$/.test(s);

      const letters = (s.match(/[A-Za-z]/g) || []).join('');
      if (letters) concatRaw += letters;

      if (isNum) {
        const n = parseInt(s, 10);
        sum += n;
        (n % 2 === 0 ? even : odd).push(s);
      } else if (isAlpha) {
        alphabets.push(s.toUpperCase());
      } else {
        specials.push(s);
      }
    }

    const concat_string = concatRaw
      .split('').reverse()
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join('');

    return res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB_DDMMYYYY}`,
      email: EMAIL,
      roll_number: ROLL,
      odd_numbers: odd,
      even_numbers: even,
      alphabets,
      special_characters: specials,
      sum: String(sum),
      concat_string
    });
  } catch (e) {
    return res.status(500).json({ is_success: false, error: e?.message || 'unknown error' });
  }
};
