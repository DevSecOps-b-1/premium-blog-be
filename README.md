# Struktur Tabel

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

## Fungsi-Fungsi dalam Model (di direktori "models" tinggal panggil aja)

### Author

- **Membuat akun author baru**: `createAuthorUser(username, email, password)`
  - **Request**:
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```
  - **Response**:
    ```json
    {
      "id": "number",
      "username": "string",
      "email": "string",
      "is_author": true
    }
    ```
- **Menambah postingan**: `addPost(title, content, isPremium)`
  - **Request**:
    ```json
    {
      "title": "string",
      "content": "string",
      "isPremium": "boolean"
    }
    ```
  - **Response**:
    ```json
    {
      "id": "number",
      "title": "string",
      "content": "string",
      "is_premium": "boolean",
      "created_at": "timestamp"
    }
    ```
- **Mengedit postingan**: `editPost(postId, title, content, isPremium)`

  - **Request**:
    ```json
    {
      "postId": "number",
      "title": "string",
      "content": "string",
      "isPremium": "boolean"
    }
    ```
  - **Response**:

    ```json
    {
      "id": "number",
      "title": "string",
      "content": "string",
      "is_premium": "boolean",
      "created_at": "timestamp"
    }
    ```

- **Menghapus postingan**: `deletePost(postId)`
  - **Request**:
    ```json
    {
      "postId": "number"
    }
    ```
  - **Response**:
    ```
      boolean
    ```
- **Mengupdate langganan pengguna**: `updateUserSubscription(userId, isPremium)`
  - **Request**:
    ```json
    {
      "userId": "number",
      "isPremium": "boolean"
    }
    ```
  - **Response**:
    ```json
    {
      "status": "success",
      "data": {
        "id": "number",
        "is_premium": "boolean"
      }
    }
    ```

### Authentication

- **Registrasi**: `registerUser(username, email, password)`
  - **Request**:
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```
  - **Response**:
    ```json
    {
      "status": "success",
      "data": {
        "id": "number",
        "username": "string",
        "email": "string"
      }
    }
    ```
- **Login**: `loginUser(email, password)`
  - **Request**:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - **Response**:
    ```json
    {
      "status": "success",
      "data": {
        "id": "number",
        "username": "string",
        "is_premium": "boolean",
        "is_author": "boolean"
      }
    }
    ```

### Post

- **Mendapatkan daftar semua postingan**: `getPostList()`
  - **Response**:
    ```json
    {
      "status": "success",
      "data": [
        {
          "id": "number",
          "title": "string",
          "content": "string",
          "is_premium": "boolean",
          "created_at": "timestamp"
        }
      ]
    }
    ```
- **Mendapatkan detail satu postingan**: `viewSinglePost(postId, isPremiumUser)`
  - **Request**:
  ```json
  {
    "postId": "number",
    "isPremiumUser": "boolean"
  }
  ```
  - **Response**:
    ```json
    {
      "status": "success",
      "data": {
        "id": "number",
        "title": "string",
        "content": "string",
        "is_premium": "boolean",
        "created_at": "timestamp"
      }
    }
    ```
- **Mendapatkan komentar pada postingan tertentu**: `getComments(postId)`
  - **Request**:
    ```json
    {
      "postId": "number"
    }
    ```
  - **Response**:
    ```json
    {
      "status": "success",
      "data": [
        {
          "id": "number",
          "user_id": "number",
          "comment_text": "string",
          "created_at": "timestamp"
        }
      ]
    }
    ```

### User

- **Menambah komentar pada postingan**: `addComment(postId, userId, commentText)`
  - **Request**:
    ```json
    {
      "postId": "number",
      "userId": "number",
      "commentText": "string"
    }
    ```
  - **Response**:
    ```json
    {
      "status": "success",
      "data": {
        "id": "number",
        "post_id": "number",
        "user_id": "number",
        "comment_text": "string",
        "created_at": "timestamp"
      }
    }
    ```
- **Mendapatkan status premium pengguna**: `getUserStatus(identifier)` - (`identifier` bisa berupa email atau ID)
  - **Request**:
    ```json
    {
      "identifier": "string"
    }
    ```
  - **Response**:
    ```json
    {
      "status": "success",
      "data": {
        "id": "number",
        "is_premium": "boolean"
      }
    }
    ```

---

## Cara Pakai

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
   Aplikasi akan otomatis membuat tabel jika belum ada, karena fungsi `createTables()` akan dieksekusi di `index.js` kalau gagal connect nanti nggak jalan servernya.

---

## Catatan

Pastikan database PostgreSQL Anda aktif sebelum menjalankan aplikasi.
