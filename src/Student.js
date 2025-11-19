/**
 * Class Student
 * Representasi dari seorang siswa dengan data dan nilai-nilainya
 * 
 * TODO: Implementasikan class Student dengan:
 * - Constructor untuk inisialisasi properti (id, name, class, grades)
 * - Method addGrade(subject, score) untuk menambah nilai mata pelajaran
 * - Method getAverage() untuk menghitung rata-rata nilai
 * - Method getGradeStatus() untuk menentukan status Lulus/Tidak Lulus
 * - Method displayInfo() untuk menampilkan informasi siswa
 * 
 * Kriteria Lulus: rata-rata >= 75
 */

class Student {
  /**       
  * Constructor untuk inisialisasi siswa
   * @param {string|number} id - ID unik siswa
   * @param {string} name - Nama siswa
   * @param {string} studentClass - Kelas siswa
   */
      
  constructor(id, name, studentClass) {
    if (name === '' || name === null || name === undefined) {
      throw new Error('Nama siswa tidak boleh kosong');
    }
    this.id = id;
    this.name = name;
    this.class = studentClass;
    this.grades = {}; 
  }

  /**
   * Menambah atau update nilai mata pelajaran
   * @param {string} subject - Nama mata pelajaran
   * @param {number} score - Nilai (0-100)
   * @throws {Error} Jika nilai tidak valid
   * TODO: Validasi bahwa score harus antara 0-100
   */


  addGrade(subject, score) {
    
     if (subject === '' || subject === null || subject === undefined) {
      throw new Error('Nama mata pelajaran tidak boleh kosong');
    }
    
    // Cek apakah nilai adalah angka
    if (typeof score !== 'number') {
      throw new Error('Nilai harus berupa angka');
    }
    
    // Cek apakah nilai antara 0-100
    if (score < 0 || score > 100) {
      throw new Error('Nilai harus antara 0-100');
    }
    
    this.grades[subject] = score;
  }

  /**
   * Menghitung rata-rata nilai dari semua mata pelajaran
   * @returns {number} Rata-rata nilai
   * TODO: Hitung total nilai dibagi jumlah mata pelajaran
   */
  getAverage() {
    
    const subjects = Object.keys(this.grades);
         if (subjects.length === 0) {
      return 0;
    }
    
      let total = 0;
    for (let i = 0; i < subjects.length; i++) {
      const subject = subjects[i];
      total = total + this.grades[subject];
    }
       
    const average = total / subjects.length;
    return average;
  }
  

  /**
   * Menentukan status kelulusan siswa
   * @returns {string} "Lulus" atau "Tidak Lulus"
   * TODO: Return "Lulus" jika rata-rata >= 75, selain itu "Tidak Lulus"
   */
  getGradeStatus() {
    
    const average = this.getAverage();
    
     if (average >= 75) {
      return "Lulus";
    } else {
      return "Tidak Lulus";
    }
  }
  
 
  displayInfo() {
    console.log("=================================");
    console.log("ID: " + this.id);
    console.log("Nama: " + this.name);
    console.log("Kelas: " + this.class);
    console.log("---------------------------------");
    console.log("Nilai Mata Pelajaran:");
    
    // Ambil semua mata pelajaran
    const subjects = Object.keys(this.grades);
    
    // Kalau belum ada nilai
    if (subjects.length === 0) {
      console.log("  Belum ada nilai");
    } else {
      // Tampilkan semua nilai
      for (let i = 0; i < subjects.length; i++) {
        const subject = subjects[i];
        const score = this.grades[subject];
        console.log("  " + subject + ": " + score);
      }
    }
    
    
    console.log("---------------------------------");
    console.log("Rata-rata: " + this.getAverage().toFixed(2));
    console.log("Status: " + this.getGradeStatus());
    console.log("=================================");
  }
}

export default Student;
