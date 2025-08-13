
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: {
                    'dev/styles/main.css': 'src/styles/main.less'
                }
            },
            production: {
                options:{
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less'
                }
            }
        },
        watch:{
            less:{
                files: ['src/styles/**/*.less'],
                tasks: ['less:development']
            },
            html:{
                files: ['src/index.html'],
                tasks: ['replace:dev']
            },
            js: {
                files: ['src/scripts/*.js'], 
                tasks: ['replace:dev'] 
            }
        },
        replace: {
            dev:{
                options:{
                    patterns: [
                        {
                            match: 'ENDERECO-DO-CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO-DO-JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist:{
                options:{
                    patterns: [
                        {
                            match: 'ENDERECO-DO-CSS',
                            replacement: './styles/main.min.css'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        htmlmin: {
            dist:{
                options:{
                    removeComments: true,
                    collapseWhitespace: true
                },
                files:{
                    //minificação e substiruição do arquivo HTML
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },
        clean:[
            'prebuild'
        ]
    })

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');


    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production', 'replace:dist', 'htmlmin:dist', 'clean']);
}