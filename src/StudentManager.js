/**
 * Class StudentManager
 * Mengelola koleksi siswa dan operasi-operasi terkait
 * 
 * TODO: Implementasikan class StudentManager dengan:
 * - Constructor untuk inisialisasi array students
 * - Method addStudent(student) untuk menambah siswa
 * - Method removeStudent(id) untuk menghapus siswa
 * - Method findStudent(id) untuk mencari siswa
 * - Method updateStudent(id, data) untuk update data siswa
 * - Method getAllStudents() untuk mendapatkan semua siswa
 * - Method getTopStudents(n) untuk mendapatkan top n siswa
 * - Method displayAllStudents() untuk menampilkan semua siswa
 */

class StudentManager {
  // TODO: Implementasikan constructor
  // Properti yang dibutuhkan:
  // - students: Array untuk menyimpan semua siswa
  
  constructor() {
   this.students = [];
  }

  /**
   * Menambah siswa baru ke dalam sistem
   * @param {Student} student - Object Student yang akan ditambahkan
   * @returns {boolean} true jika berhasil, false jika ID sudah ada
   * TODO: Validasi bahwa ID belum digunakan
   */
  addStudent(student) {
   if (!student || !student.id || !student.name) {
      throw new Error('Data siswa tidak valid');
    }
    
  
    const found = this.findStudent(student.id);
    
    if (found !== null) {
      return false; 
    }
    
   
    this.students.push(student);
    return true; 
  }
  

  /**
   * Menghapus siswa berdasarkan ID
   * @param {string} id - ID siswa yang akan dihapus
   * @returns {boolean} true jika berhasil, false jika tidak ditemukan
   * TODO: Cari dan hapus siswa dari array
   */
  removeStudent(id) {
   
    let position = -1;
    
    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i].id === id) {
        position = i;
        break; 
      }
    }
    
   
    if (position === -1) {
      return false;
    }
    
    
    this.students.splice(position, 1);
    return true;
    
  }

  /**
   * Mencari siswa berdasarkan ID
   * @param {string} id - ID siswa yang dicari
   * @returns {Student|null} Object Student jika ditemukan, null jika tidak
   * TODO: Gunakan method array untuk mencari siswa
   */
  findStudent(id) {
     // Loop semua siswa untuk cari yang ID-nya sama
    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i].id === id) {
        return this.students[i]; // Return siswa yang ketemu
      }
    }
    
    return null; // Kalau tidak ketemu, return null
  }
  

  /**
   * Update data siswa
   * @param {string} id - ID siswa yang akan diupdate
   * @param {object} data - Data baru (name, class, dll)
   * @returns {boolean} true jika berhasil, false jika tidak ditemukan
   * TODO: Cari siswa dan update propertinya
   */
  updateStudent(id, data) {
   // Cari siswa dulu
    const student = this.findStudent(id);
    
    // Kalau tidak ketemu
    if (student === null) {
      return false;
    }
    
    // Update nama kalau ada
    if (data.name !== undefined && data.name !== null) {
      // Cek nama tidak boleh kosong
      if (data.name === '') {
        throw new Error('Nama siswa tidak boleh kosong');
      }
      student.name = data.name;
    }
    
   
    if (data.class !== undefined && data.class !== null) {
      student.class = data.class;
    }
    
   
    if (data.grades !== undefined && data.grades !== null) {
      student.grades = data.grades;
    }
    
    return true; 
  }

  /**
   * Mendapatkan semua siswa

   * @returns {Array} Array berisi semua siswa
   */
  getAllStudents() {
     return this.students;
  }

  /**
   * Mendapatkan top n siswa berdasarkan rata-rata nilai
   * @param {number} n - Jumlah siswa yang ingin didapatkan
   * @returns {Array} Array berisi top n siswa
   * TODO: Sort siswa berdasarkan rata-rata (descending) dan ambil n teratas
   */
  getTopStudents(n) {
 
    if (typeof n !== 'number' || n < 1) {
      n = 3;
    }
    
   
    const sortedStudents = [];
    for (let i = 0; i < this.students.length; i++) {
      sortedStudents.push(this.students[i]);
    }
    
   
    for (let i = 0; i < sortedStudents.length - 1; i++) {
      for (let j = 0; j < sortedStudents.length - i - 1; j++) {
        if (sortedStudents[j].getAverage() < sortedStudents[j + 1].getAverage()) {
        
          const temp = sortedStudents[j];
          sortedStudents[j] = sortedStudents[j + 1];
          sortedStudents[j + 1] = temp;
        }
      }
    }
    
   
    const topStudents = [];
    for (let i = 0; i < n && i < sortedStudents.length; i++) {
      topStudents.push(sortedStudents[i]);
    }
    
    return topStudents;
  }

  /**
   * Menampilkan informasi semua siswa
   * TODO: Loop semua siswa dan panggil displayInfo() untuk masing-masing
   */
  displayAllStudents() {
    if (this.students.length === 0) {
      console.log("Tidak ada siswa dalam sistem.");
      return;
    }
    
    console.log("\n========== DAFTAR SEMUA SISWA ==========\n");
    
    // Loop dan tampilkan info setiap siswa
    for (let i = 0; i < this.students.length; i++) {
      this.students[i].displayInfo();
      console.log("\n");
    }
  }
  

  /**
   * BONUS: Mendapatkan siswa berdasarkan kelas
   * @param {string} className - Nama kelas
   * @returns {Array} Array siswa dalam kelas tersebut
   */
  getStudentsByClass(className) {
    // Implementasi method di sini (BONUS)
  }

  /**
   * BONUS: Mendapatkan statistik kelas
   * @param {string} className - Nama kelas
   * @returns {object} Object berisi statistik (jumlah siswa, rata-rata kelas, dll)
   */
  getClassStatistics(className) {
    // Implementasi method di sini (BONUS)
  }
}

export default StudentManager;
