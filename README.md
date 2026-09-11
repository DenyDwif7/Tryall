# Tryall - Backend API Service

Backend API service dibangun menggunakan **Bun**, **ElysiaJS**, **Drizzle ORM**, dan **MySQL**.

## Tech Stack
- **Runtime**: [Bun](https://bun.sh)
- **Web Framework**: [ElysiaJS](https://elysiajs.com)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team)
- **Database Driver**: [MySQL2](https://github.com/sidorares/node-mysql2)
- **Language**: TypeScript

---

## Struktur Folder
```text
.
├── src/
│   ├── db/
│   │   ├── index.ts      # Koneksi pool MySQL dan instance Drizzle
│   │   └── schema.ts     # Definisi skema tabel database (tabel users)
│   └── index.ts          # Entry point aplikasi ElysiaJS
├── drizzle.config.ts     # Konfigurasi migrasi Drizzle Kit
├── .env.example          # Contoh variabel konfigurasi environment
├── .env                  # Variabel environment lokal
├── package.json          # Metadata proyek & daftar scripts
├── tsconfig.json         # Konfigurasi TypeScript
└── README.md
```

---

## Persiapan & Menjalankan

### 1. Install Dependensi
```bash
bun install
```

### 2. Konfigurasi Environment
Salin file `.env.example` menjadi `.env` lalu sesuaikan kredensial MySQL Anda:
```env
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=
DATABASE_NAME=tryall_db
```

### 3. Database & Migrasi (Drizzle)
- **Generate migrasi dari skema**:
  ```bash
  bun run db:generate
  ```
- **Push skema langsung ke database**:
  ```bash
  bun run db:push
  ```
- **Buka Drizzle Studio (Database GUI)**:
  ```bash
  bun run db:studio
  ```

### 4. Menjalankan Server
- **Mode Development (Hot-reload)**:
  ```bash
  bun run dev
  ```
- **Mode Production**:
  ```bash
  bun run start
  ```

Server akan aktif di `http://localhost:3000`.

---

## API Endpoints
- `GET /` - Status dasar server
- `GET /health` - Health check status & uptime
- `GET /api/users` - Mengambil data seluruh pengguna dari database
- `POST /api/users` - Menambahkan data pengguna baru (`{ "name": "John", "email": "john@example.com" }`)
