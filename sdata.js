const fs = require('fs');
const path = require('path');

function saveData(directory_1, folder, flag) {

    let flagMkdir;
    let flagWriteFile;

    if (flag === true ) {

            fs.readdir(path.join(__dirname, directory_1), function (err,file) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(path.join(__dirname, directory_1));
                    console.log(file);

                    fs.mkdir(path.join(__dirname, folder), function (err) {
                        if (err.code === 'EEXIST') {
                            console.log('Folder juz istnieje');
                            flagMkdir = false;
                        } else if (err) {
                            console.log(err);
                            flagMkdir = false
                        }
                        else {

                            console.log('Stworzono folder');
                            flagMkdir = false;
                        }
                    });


                    fs.readFile(path.join(__dirname, directory_1, '2-read-write-users.json'), 'utf-8', function (err, filesData) {
                        
                        if (err) {
                            console.log(err);
                        } else {

                            console.log(filesData);

                            let usersData = JSON.parse(filesData);

                            console.log(usersData);

                            for (let userData of usersData) {

                                
                                let id = userData.id;
                                let part = userData.name.split(" ");
                                let name = part[0];
                                let surname = part[1];

                                fs.writeFile(path.join(__dirname, folder, id + '-' + name + '-' + surname + '.txt'),
                                    `Name: ${name}\n` + `Surname: ${surname}\n` + `Street: ${userData.address.street}\n`
                                    + `Zip Code: ${userData.address.zipcode}\n` + `City: ${userData.address.city}\n` + `Phone: ${userData.phone}`, function (err) {

                                        if (err) {
                                            console.log(err);
                                            flagWriteFile = false;
                                        } else {
                                            console.log('Stworzono plik ' + id + '-' + name + '-' + surname + '.txt');
                                            flagWriteFile = false;
                                        }
                                })

                            }


                        }

                    })
                }
            })

            console.log('Pierwszy if flag '+ flag);
            console.log('Pierwszy  if flagMkdir '+ flagMkdir);
            console.log('Pierwszy if flagWriteFile '+ flagWriteFile);
       

    } 
    
    if (flag === false  || flagMkdir === false || flagWriteFile === false) {

        console.log('Drugi if flag '+ flag);
        console.log('Drugi if flagMkdir '+ flagMkdir);
        console.log('Drugi if flagWriteFile '+ flagWriteFile);

        console.log('W  parametrze funkcji saveData() przekazano false lub nie utworzono folderu lub nie stworzono plików');

    }

}

module.exports = saveData;
