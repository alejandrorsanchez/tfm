const rimraf = require("rimraf");
const fs = require('fs');

module.exports = {
    removeAllFiles: function(id) {
        rimraf.sync('./uploads/' + id);
    },
    createDirectory: function(resolvedPath, id) {
        fs.mkdir(resolvedPath + '/' + id,function(err){
            if (err) return console.error(err);
            console.log("Directory created successfully!");
        });
    },
    copyFileAndDeleteFromOrigin: function(origin, destination, name) {
        fs.copyFile(origin + "/" + name,destination+"/" + name,(error) => {
            if(error) console.log(error);
            else this.removeFile(origin, name);
        })
    },
    removeFile: function (directory, name) {
        fs.unlink(directory + "/" + name,(error)=> {
            if(error) console.log("error al eliminar");
            else console.log("OK");
        })
    },
    deleteFilesFromDirectory: function(directory) {
        fs.readdir(directory, (err, files) => {
            if (err) throw err;
            for (const file of files) {
                fs.unlink(path.join(directory, file), error => {
                    if (error) throw error;
                });
            }
        });
    }
};
