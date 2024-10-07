pipeline {
    agent any

    triggers {
        GenericTrigger(
            token: 'prograph-token' 
        )
    }

    stages {
        stage('Build & Run') {
            steps {  
                script {
                    // Use the environment variable to get the branch name
                    def branchName = env.GIT_BRANCH ?: sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
                    sh "echo ${branchName}"
                    if (branchName == 'origin/new-config-ubuntu') {
                        sh "rm -r /home/prograph/Desktop/ProGraph/ProGraph-Web"
                        sh "mv /var/lib/jenkins/workspace/ProGraph-Web /home/prograph/Desktop/ProGraph/ProGraph-Web"
                        sh '''
                            export NVM_DIR="$HOME/.nvm"
                            [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # Source NVM
                        
                            nvm install 22.8.0
                            nvm use 22.8.0
                        '''
                        sh "npm i"
                        sh "npm run build"
                        sh ''' pm2 delete "prograph_web" ''' 
                        sh '''pm2 start npm --name "prograph_web" -- start -- -H 0.0.0.0 -p 3000'''
                    } else {
                        error("Build stopped because the branch is not 'new-config-ubuntu'.")
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
