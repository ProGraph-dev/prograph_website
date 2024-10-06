pipeline {
    agent any

    triggers {
        GenericTrigger(
            token: 'prograph-token' 
        )
    }

    stages {
        stage('Build') {
            steps {  
                script {
                    // Use the environment variable to get the branch name
                    def branchName = env.GIT_BRANCH ?: sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
                    sh "echo ${branchName}"
                    if (branchName == 'development') {
                        sh "npm i"
                        sh "npm run build"
                    } else {
                        error("Build stopped because the branch is not 'development'.")
                    }
                }
            }
        }

        stage('Run') {
            steps {
                script {
                    sh "npm run start &"
                }   
            }
        }
    }

    post {
        success {
            script {
                def branchName = env.GIT_BRANCH ?: sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
                if (branchName == 'development') {
                    def curlCmd = '''curl -X POST -H "Content-Type: application/json" -d '{"chat_id": "-4518758992", "text": "[🎉SUCCESS] Frontend build succeeded! 🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉", "disable_notification": false}' https://api.telegram.org/bot7541177344:AAHjoqOz59t31P202BUzQ5agy-ViEYp2uAY/sendMessage'''
                    def response = sh(script: curlCmd, returnStdout: true).trim()
                    echo "Curl command output: ${response}"
                }
            }
        }
        failure {
            script {
                def branchName = env.GIT_BRANCH ?: sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
                if (branchName == 'development') {
                    def curlCmd = '''curl -X POST -H "Content-Type: application/json" -d '{"chat_id": "-4518758992", "text": "[💀FAILED] Frontend build failed😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭!", "disable_notification": false}' https://api.telegram.org/bot7541177344:AAHjoqOz59t31P202BUzQ5agy-ViEYp2uAY/sendMessage'''
                    def response = sh(script: curlCmd, returnStdout: true).trim()
                    echo "Curl command output: ${response}"
                }
            }
        }
    }
}
