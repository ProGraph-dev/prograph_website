pipeline {
    agent any

    triggers {
        GenericTrigger(
            token: 'prograph-token'
        )
    }

    stages {
        stage('Checkout Repository') {
            steps {
                script {
                    def repoUrl = 'git@github.com:ProGraph-dev/prograph_website.git'
                    def branchName = 'development'
                    def dirPath = '/home/prograph/Desktop/ProGraph/ProGraph-Web'

                    echo "Cloning repository..."
                    sh '''
                        if [ -d ''' + dirPath + ''' ]; then
                            cd ''' + dirPath + '''
                            git fetch --all
                            git reset --hard origin/''' + branchName + '''
                            git pull origin ''' + branchName + '''
                        else
                            git clone -b ''' + branchName + ''' ''' + repoUrl + ''' ''' + dirPath + '''
                        fi
                    '''
                }
            }
        }

        stage('Stop Process') {
            steps {
                script {
                    def pid = sh(script: "lsof -t -i:3000 || true", returnStdout: true).trim()
                    if (pid) {
                        echo "Stopping process with PID: ${pid} on port 3000"
                        sh "kill -9 ${pid}"
                    } else {
                        echo "No process found running on port 3000"
                    }
                }
            }
        }

        stage('Build & Run') {
            steps {
                script {
                    def dirPath = '/home/prograph/Desktop/ProGraph/ProGraph-Web'
                    sh '''
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # Source NVM

                        # Install and use Node version
                        nvm install 22.8.0
                        nvm use 22.8.0

                        cd ''' + dirPath + '''
                        npm install
                        npm run build

                        screen -dmS prograph_server npm run start -- -p 3000
                    '''
                }
            }
        }
    }

    post {
        success {
            script {
                def curlCmd = '''curl -X POST -H "Content-Type: application/json" -d '{"chat_id": "-4518758992", "text": "[🎉SUCCESS] Frontend build succeeded! 🎉🎉🎉", "disable_notification": false}' https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage'''
                def response = sh(script: curlCmd, returnStdout: true).trim()
                echo "Curl command output: ${response}"
            }
        }
        failure {
            script {
                def curlCmd = '''curl -X POST -H "Content-Type: application/json" -d '{"chat_id": "-4518758992", "text": "[💀FAILED] Frontend build failed! 😭😭😭", "disable_notification": false}' https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage'''
                def response = sh(script: curlCmd, returnStdout: true).trim()
                echo "Curl command output: ${response}"
            }
        }
    }
}
