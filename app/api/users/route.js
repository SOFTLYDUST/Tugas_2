import mysql from "mysql2/promise";

function getDb() {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tugas_profil",
  });
}

export async function GET() {
  const db = await getDb();
  try {
    const [rows] = await db.execute("SELECT * FROM profiles");
    return Response.json(rows);
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Database error" },
      { status: 500 }
    );
  } finally {
    await db.end();
  }
}

export async function PUT(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const id = body?.id;
  if (id == null || id === "") {
    return Response.json({ error: "id wajib ada" }, { status: 400 });
  }

  const {
    nama_lengkap,
    kelas,
    prodi,
    domisili,
    foto_profil,
    foto_cover,
    tentang_diri,
    koneksi,
    universitas,
  } = body;

  const db = await getDb();
  try {
    await db.execute(
      `UPDATE profiles SET
        nama_lengkap = ?,
        kelas = ?,
        prodi = ?,
        domisili = ?,
        foto_profil = ?,
        foto_cover = ?,
        tentang_diri = ?,
        koneksi = ?,
        universitas = ?,
        updated_at = NOW()
      WHERE id = ?`,
      [
        nama_lengkap ?? "",
        kelas ?? "",
        prodi ?? "",
        domisili ?? "",
        foto_profil ?? "",
        foto_cover ?? "",
        tentang_diri ?? "",
        koneksi ?? "",
        universitas ?? "",
        id,
      ]
    );
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Database error" },
      { status: 500 }
    );
  } finally {
    await db.end();
  }
}
