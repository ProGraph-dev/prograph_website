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
                            sh "rm -r ${dirPath}"
                            echo "Successfully removed directory: ${dirPath}"
                        } catch (Exception e) {
                            echo "Failed to remove directory: ${dirPath}"
                            echo "Error: ${e.getMessage()}"
                            currentBuild.result = 'FAILURE'
                        }
                    } else {
                        sh "echo 2-${pwd}"
                        echo "Directory does not exist: ${dirPath}"
                    }
                }
            }
        }
        
        stage('Build') {
            steps {  
                script {
                    // Use the environment variable to get the branch name
                    sh "echo 3-${pwd}"
                    def branchName = env.GIT_BRANCH ?: sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
                    if (branchName == 'origin/new-config-ubuntu') {                        
                        sh "echo aaa"
                        sh "cd /var/lib/jenkins/workspace/ProGraph-Web"
                        sh "echo 4-${pwd}"
                        // sh "mv /var/lib/jenkins/workspace/ProGraph-Web /home/prograph/Desktop/ProGraph/ProGraph-Web || true"
                        sh "echo rrr"
                        sh '''
                            export NVM_DIR="$HOME/.nvm"
                            [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # Source NVM
                    
                            nvm install 22.8.0
                            nvm use 22.8.0
                        '''
                        sh "npm i"
                        sh "npm run build"
                        sh "ls -la"
                        def mvResult = sh(script: "mv .next /home/prograph/Desktop/ProGraph/ProGraph-Web", returnStatus: true)
                        if (mvResult != 0) {
                            error("Failed to move directory. Exit code: ${mvResult}")
                        } else {
                            echo "Directory moved successfully."
                        }
                    } else {
                        error("Build stopped because the branch is not 'new-config-ubuntu'.")
                    }
                }
            }
        }

        stage('Run') {
            steps {
                script {
                    sh '''
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # Source NVM
                
                        nvm install 22.8.0
                        nvm use 22.8.0
                    '''
                    sh '''
                        pm2 delete prograph_web --cwd /home/prograph/Desktop/ProGraph/
                        pm2 start npm --name prograph_web --cwd /home/prograph/Desktop/ProGraph/ -- run start -- -H 0.0.0.0 -p 3000
                    '''
                    sh ''' pm2 delete "prograph_web" ''' 
                    sh '''pm2 start npm --name "prograph_web" -- start -- -H 0.0.0.0 -p 3000'''
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
