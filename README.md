# SK-ViDownloader
Scrapping SK vids links using JS


Cara makenya:

1. npm install

2. Setting ExecutablePath ke chrome.exe, soalnya make puppeter-core
  - executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  
3. Setting data login
  - await page.type('#email', 'yourEmailHere'); 
  - await password.type('yourPasswordHere');
  
 4. Masuk ke halaman video paling pertama dari kelas di SK gan! comot urlnya, taro disini :
  - let url = 'https://sekolahkoding.com/kelas/kenalan-dengan-firebase-dari-google/video/kenalan-dengan-firebase-hosting-website-statis';
  
 5. Setting banyak video yg mau di-downloadnya gan disini:
  - let totalVideos = 9; //Pas-in aja sama jumlah video totalnya gan!
  
 6. Ohiya, jangan lupa buat direktori namanya "links" gan!
 
 7. Jalaninnya : node index.js
 
 8. Nanti kebuat file.txt sendiri didalem dir "links", buka IDM -> pilih tab Tasks -> Import -> From textFile -> pilih filenya gan!
 
 9. Tungguin downloadnya kelar sambil nonton anime gan!
