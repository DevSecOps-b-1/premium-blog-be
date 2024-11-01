Berikut adalah versi yang lebih rapi dari file `README.md` Anda:

---

# Blog Premium dengan Node.js dan PostgreSQL

Aplikasi blog ini memungkinkan pengguna untuk membuat, membaca, dan berkomentar pada postingan. Fitur premium tersedia bagi pengguna berlangganan, memungkinkan mereka untuk mengakses konten khusus.

## Struktur Tabel

### 1. Tabel `users`

- **id**: `number` - ID pengguna
- **username**: `string` - Nama pengguna
- **password**: `string` - Sandi pengguna
- **is_premium**: `boolean` - Status langganan premium
- **is_author**: `boolean` - Status apakah pengguna adalah penulis

### 2. Tabel `posts`

- **id**: `number` - ID postingan
- **title**: `string` - Judul postingan
- **content**: `string` - Isi postingan
- **is_premium**: `boolean` - Status apakah postingan premium
- **created_at**: `timestamp` - Tanggal pembuatan postingan

### 3. Tabel `comments`

- **id**: `number` - ID komentar
- **post_id**: `number` - ID postingan yang dikomentari
- **user_id**: `number` - ID pengguna yang berkomentar
- **comment_text**: `string` - Isi komentar
- **created_at**: `timestamp` - Tanggal pembuatan komentar

---

## Fungsi-Fungsi dalam Model

### Author

- **Membuat akun author baru**: `createAuthorUser(username, email, password)`
- **Menambah postingan**: `addPost(title, content, isPremium)`
- **Mengedit postingan**: `editPost(postId, title, content, isPremium)`
- **Menghapus postingan**: `deletePost(postId)`
- **Mengupdate langganan pengguna**: `updateUserSubscription(userId, isPremium)`

### Authentication

- **Registrasi**: `registerUser(username, email, password)`
- **Login**: `loginUser(email, password)`

### Post

- **Mendapatkan daftar semua postingan**: `getPostList()`
- **Mendapatkan detail satu postingan**: `viewSinglePost(postId, isPremiumUser)`
- **Mendapatkan komentar pada postingan tertentu**: `getComments(postId)`

### User

- **Menambah komentar pada postingan**: `addComment(postId, userId, commentText)`
- **Mendapatkan profil pengguna**: `getUser(identifier)` - (`identifier` bisa berupa email atau ID)

---

## Cara Menggunakan Project

1. **Instalasi Dependensi**

   ```bash
   npm install
   ```

2. **Konfigurasi `.env`**
   Buat file `.env` di root project dengan isi sebagai berikut:

   ```plaintext
   PG_DB_USER=postgres
   PG_DB_NAME=blog_premium
   PG_DB_PASSWORD=postgres
   PG_DB_HOST=localhost
   ```

3. **Buat Database PostgreSQL**
   Pastikan Anda sudah membuat database sesuai dengan nama pada variabel `PG_DB_NAME` di PostgreSQL.

4. **Menjalankan Aplikasi**
   Jalankan perintah berikut untuk memulai aplikasi:
   ```bash
   npm start
   ```
   Aplikasi akan otomatis membuat tabel jika belum ada, karena fungsi `createTables()` akan dieksekusi di `index.js`.

---

## Catatan

Pastikan database PostgreSQL Anda aktif sebelum menjalankan aplikasi.
