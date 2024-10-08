pipeline {
    agent any

    triggers {
        GenericTrigger(
            token: 'prograph-token' 
        )
    }

    stages {
        stage('Remove Directory if Exists') {
            steps {
                script {
                    def dirPath = '/home/prograph/Desktop/ProGraph/ProGraph-Web'
                    
                    def exists = sh(script: "test -d ${dirPath} && echo 'exists' || echo 'not exists'", returnStdout: true).trim()
                    echo "Checking existence of directory: ${dirPath}, Found: ${exists}"
                    sh "echo 1-${pwd}"
                    if (exists == 'exists') {
                        try {
                            sh "rm -rf ${dirPath}/*"
                            echo "Successfully removed directory: ${dirPath}"
                        } catch (Exception e) {
                            echo "Failed to remove directory: ${dirPath}"
                            echo "Error: ${e.getMessage()}"
                            currentBuild.result = 'FAILURE'
                        }
                    } else {
                        sh '''
                            mkdir -p /home/prograph/Desktop/ProGraph/ProGraph-Web
                        '''
                        echo "Directory does not exist: ${dirPath}"
                    }
                }
            }
        }
        
        stage('Move Folders') {
            steps {  
                script {
                    def branchName = env.GIT_BRANCH ?: sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
                    if (branchName == 'origin/new-config-ubuntu') {                        
                        sh '''
                            mv * /home/prograph/Desktop/ProGraph/ProGraph-Web/
                        '''
                    } else {
                        error("Build stopped because the branch is not 'new-config-ubuntu'.")
                    }
                }
            }
        }

        stage('Build & Run') {
            steps {
                script {
                    def branchName = env.GIT_BRANCH ?: sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
                    if (branchName == 'origin/new-config-ubuntu') {     
                        dir('/home/prograph/Desktop/ProGraph/ProGraph-Web') {
                            script {
                                sh '''
                                    export NVM_DIR="$HOME/.nvm"
                                    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # Source NVM
                                
                                    nvm install 22.8.0
                                    nvm use 22.8.0
                                '''
                                sh "npm install"
                                sh "npm run build"
                                sh '''
                                    pm2 delete prograph_web
                                    pm2 start npm --name prograph_web -- start -- -H 0.0.0.0 -p 3000
                                '''
                            }
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            script {
                def branchName = env.GIT_BRANCH ?: sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
                if (branchName == 'origin/new-config-ubuntu') {
                    def curlCmd = '''curl -X POST -H "Content-Type: application/json" -d '{"chat_id": "-4518758992", "text": "[🎉SUCCESS] Frontend build succeeded! 🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉", "disable_notification": false}' https://api.telegram.org/bot7541177344:AAHjoqOz59t31P202BUzQ5agy-ViEYp2uAY/sendMessage'''
                    def response = sh(script: curlCmd, returnStdout: true).trim()
                    echo "Curl command output: ${response}"
                }
            }
        }
        failure {
            script {
                def branchName = env.GIT_BRANCH ?: sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
                if (branchName == 'origin/new-config-ubuntu') {
                    def curlCmd = '''curl -X POST -H "Content-Type: application/json" -d '{"chat_id": "-4518758992", "text": "[💀FAILED] Frontend build failed😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭!", "disable_notification": false}' https://api.telegram.org/bot7541177344:AAHjoqOz59t31P202BUzQ5agy-ViEYp2uAY/sendMessage'''
                    def response = sh(script: curlCmd, returnStdout: true).trim()
                    echo "Curl command output: ${response}"
                }
            }
        }
    }
}
