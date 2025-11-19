/**
 * Main Application - CLI Interface
 * File ini adalah entry point aplikasi
 * 
 * TODO: Implementasikan CLI interface yang interaktif dengan menu:
 * 1. Tambah Siswa Baru
 * 2. Lihat Semua Siswa
 * 3. Cari Siswa (by ID)
 * 4. Update Data Siswa
 * 5. Hapus Siswa
 * 6. Tambah Nilai Siswa
 * 7. Lihat Top 3 Siswa
 * 8. Keluar
 */

import readlineSync from 'readline-sync';
import Student from './src/Student.js';
import StudentManager from './src/StudentManager.js';

// Inisialisasi StudentManager
const manager = new StudentManager();

/**
 * Menampilkan menu utama
 */
function displayMenu() {
  console.log('\n=================================');
  console.log('SISTEM MANAJEMEN NILAI SISWA');
  console.log('=================================');
  console.log('1. Tambah Siswa Baru');
  console.log('2. Lihat Semua Siswa');
  console.log('3. Cari Siswa');
  console.log('4. Update Data Siswa');
  console.log('5. Hapus Siswa');
  console.log('6. Tambah Nilai Siswa');
  console.log('7. Lihat Top 3 Siswa');
  console.log('8. Keluar');
  console.log('=================================');
}

/**
 * Handler untuk menambah siswa baru
 * TODO: Implementasikan function ini
 * - Minta input: ID, Nama, Kelas
 * - Buat object Student baru
 * - Tambahkan ke manager
 * - Tampilkan pesan sukses/gagal
 */
function addNewStudent() {
 
  console.log('\n--- Tambah Siswa Baru ---');

  try {
    
    const id = readlineSync.question('Masukkan ID siswa: ');
    

    if (id === '') {
      console.log('Error: ID siswa tidak boleh kosong!');
      return;
    }
    

    const name = readlineSync.question('Masukkan nama siswa: ');
    
  
    if (name === '') {
      console.log('Error: Nama siswa tidak boleh kosong!');
      return;
    }
    
    
    const studentClass = readlineSync.question('Masukkan kelas siswa (contoh: 10A, 11B): ');
    
    
    const student = new Student(id, name, studentClass);
    
    const success = manager.addStudent(student);
    
   
    if (success === true) {
      console.log('Berhasil! Siswa telah ditambahkan.');
    } else {
      console.log('Gagal! ID siswa sudah digunakan. Silakan gunakan ID yang berbeda.');
    }
  } catch (error) {
   
    console.log('Error: ' + error.message);
  }
}

/**
 * Handler untuk melihat semua siswa
 * TODO: Implementasikan function ini
 * - Panggil method displayAllStudents dari manager
 * - Jika tidak ada siswa, tampilkan pesan
 */
function viewAllStudents() {
 
  console.log('\n--- Daftar Semua Siswa ---');
 
  const students = manager.getAllStudents();

 
  if (students.length === 0) {
    console.log('Tidak ada siswa dalam sistem.');
    return;
  }
  
  
  manager.displayAllStudents();
}

/**
 * Handler untuk mencari siswa berdasarkan ID
 * TODO: Implementasikan function ini
 * - Minta input ID
 * - Cari siswa menggunakan manager
 * - Tampilkan info siswa jika ditemukan
 */
function searchStudent() {
  
  console.log('\n--- Cari Siswa ---');
 
  const id = readlineSync.question('Masukkan ID siswa yang dicari: ');
  
 
  if (id === '') {
    console.log('Error: ID tidak boleh kosong!');
    return;
  }
  

  const student = manager.findStudent(id);
  
  
  if (student !== null) {
    console.log('\nSiswa ditemukan:');
    student.displayInfo();
  } else {
    console.log('Siswa dengan ID "' + id + '" tidak ditemukan.');
  }
}

/**
 * Handler untuk update data siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Tampilkan data saat ini
 * - Minta input data baru (nama, kelas)
 * - Update menggunakan manager
 */
function updateStudent() {
  
  console.log('\n--- Update Data Siswa ---');
 try {
   
    const id = readlineSync.question('Masukkan ID siswa yang akan diupdate: ');
    
   
    if (id === '') {
      console.log('Error: ID tidak boleh kosong!');
      return;
    }
    
    
    const student = manager.findStudent(id);
    
  
    if (student === null) {
      console.log('Siswa dengan ID "' + id + '" tidak ditemukan.');
      return;
    }
    
    
    console.log('\nData saat ini:');
    console.log('Nama: ' + student.name);
    console.log('Kelas: ' + student.class);
    
   
    console.log('\nMasukkan data baru (tekan Enter untuk tidak mengubah):');
    const newName = readlineSync.question('Nama baru: ');
    const newClass = readlineSync.question('Kelas baru: ');
    
    
    const updateData = {};
    
    
    if (newName !== '') {
      updateData.name = newName;
    }
    
    
    if (newClass !== '') {
      updateData.class = newClass;
    }
    
 
    const dataKeys = Object.keys(updateData);
    if (dataKeys.length > 0) {
    
      const success = manager.updateStudent(id, updateData);
      if (success === true) {
        console.log('Berhasil! Data siswa telah diupdate.');
      }
    } else {
      console.log('Tidak ada perubahan data.');
    }
  } catch (error) {
    console.log('Error: ' + error.message);
  }
}

/**
 * Handler untuk menghapus siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Konfirmasi penghapusan
 * - Hapus menggunakan manager
 */
function deleteStudent() {
  
  console.log('\n--- Hapus Siswa ---');
 
  const id = readlineSync.question('Masukkan ID siswa yang akan dihapus: ');
  
  
  if (id === '') {
    console.log('Error: ID tidak boleh kosong!');
    return;
  }
  

  const student = manager.findStudent(id);
  
  if (student === null) {
    console.log('Siswa dengan ID "' + id + '" tidak ditemukan.');
    return;
  }
  
 
  console.log('\nData siswa yang akan dihapus:');
  console.log('ID: ' + student.id);
  console.log('Nama: ' + student.name);
  console.log('Kelas: ' + student.class);
  
 
  const confirmation = readlineSync.question('\nApakah Anda yakin ingin menghapus siswa ini? (y/n): ');
  
  
  if (confirmation === 'y' || confirmation === 'Y') {
  
    const success = manager.removeStudent(id);
    if (success === true) {
      console.log('Berhasil! Siswa telah dihapus.');
    } else {
      console.log('Gagal menghapus siswa.');
    }
  } else {
    console.log('Penghapusan dibatalkan.');
  }
}

/**
 * Handler untuk menambah nilai siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Tampilkan data siswa
 * - Minta input mata pelajaran dan nilai
 * - Tambahkan nilai menggunakan method addGrade
 */
function addGradeToStudent() {
  
  console.log('\n--- Tambah Nilai Siswa ---');
  try {
   
    const id = readlineSync.question('Masukkan ID siswa: ');
    
  
    if (id === '') {
      console.log('Error: ID tidak boleh kosong!');
      return;
    }
    
  
    const student = manager.findStudent(id);
    
   
    if (student === null) {
      console.log('Siswa dengan ID "' + id + '" tidak ditemukan.');
      return;
    }
    
 
    console.log('\nData siswa:');
    console.log('Nama: ' + student.name);
    console.log('Kelas: ' + student.class);
    
    const subjects = Object.keys(student.grades);
    if (subjects.length > 0) {
      console.log('\nNilai yang sudah ada:');
      for (let i = 0; i < subjects.length; i++) {
        const subject = subjects[i];
        const score = student.grades[subject];
        console.log('  ' + subject + ': ' + score);
      }
    } else {
      console.log('\nBelum ada nilai.');
    }
    
   
    console.log('');
    const subject = readlineSync.question('Masukkan nama mata pelajaran: ');
    
  
    if (subject === '') {
      console.log('Error: Nama mata pelajaran tidak boleh kosong!');
      return;
    }
   
    const scoreInput = readlineSync.question('Masukkan nilai (0-100): ');
    
    
    const score = parseFloat(scoreInput);
    
    if (isNaN(score)) {
      console.log('Error: Nilai harus berupa angka!');
      return;
    }
    
  
    student.addGrade(subject, score);
    
    console.log('Berhasil! Nilai telah ditambahkan.');
    console.log('Rata-rata saat ini: ' + student.getAverage().toFixed(2));
    console.log('Status: ' + student.getGradeStatus());
    
  } catch (error) {
    console.log('Error: ' + error.message);
  }
}

/**
 * Handler untuk melihat top students
 * TODO: Implementasikan function ini
 * - Panggil getTopStudents(3) dari manager
 * - Tampilkan informasi siswa
 */
function viewTopStudents() {
  
  console.log('\n--- Top 3 Siswa ---');

  const topStudents = manager.getTopStudents(3);
  
  
  if (topStudents.length === 0) {
    console.log('Tidak ada siswa dalam sistem.');
    return;
  }
  
  console.log('\nPeringkat berdasarkan rata-rata nilai:\n');

  for (let i = 0; i < topStudents.length; i++) {
    const student = topStudents[i];
    const ranking = i + 1;
    
    console.log(ranking + '. ' + student.name);
    console.log('   ID: ' + student.id);
    console.log('   Kelas: ' + student.class);
    console.log('   Rata-rata: ' + student.getAverage().toFixed(2));
    console.log('   Status: ' + student.getGradeStatus());
    console.log('');
  }
}

/**
 * Main program loop
 * TODO: Implementasikan main loop
 * - Tampilkan menu
 * - Baca input pilihan
 * - Panggil handler yang sesuai
 * - Ulangi sampai user pilih keluar
 */
function main() {
  console.log('Selamat datang di Sistem Manajemen Nilai Siswa!');
  
  
  let running = true;
  
   while (running === true) {
    
    displayMenu();
    
   
    const choice = readlineSync.question('Pilih menu (1-8): ');
    
    
    if (choice === '1') {
      addNewStudent();
    } else if (choice === '2') {
      viewAllStudents();
    } else if (choice === '3') {
      searchStudent();
    } else if (choice === '4') {
      updateStudent();
    } else if (choice === '5') {
      deleteStudent();
    } else if (choice === '6') {
      addGradeToStudent();
    } else if (choice === '7') {
      viewTopStudents();
    } else if (choice === '8') {
      console.log('\nKeluar dari aplikasi...');
      running = false; 
    } else {
      console.log('\nPilihan tidak valid! Silakan pilih menu 1-8.');
    }
    
    
    if (running === true && choice !== '8') {
      readlineSync.question('\nTekan Enter untuk kembali ke menu...');
    }
  }
  
  console.log('\nTerima kasih telah menggunakan aplikasi ini!');
}

// Jalankan aplikasi
main();
