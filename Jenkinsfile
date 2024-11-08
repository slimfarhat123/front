pipeline {
    agent any
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub')
        DOCKER_IMAGE_NAME = "ahmedhachicha201/tp-foyer-front"
    }
    stages {
        stage('Clone Repository') {
            steps {
                echo 'Pulling changes....'
                git url: 'git@github.com:ahmed-hachicha/tp-foyer-front.git',
                    branch: 'main'
            }
        }
        stage('Install and Build Next.js App') {
            steps {
                script {
                    // Run only this stage in Docker for Node.js dependencies and build
                    docker.image('node:18').inside('--user root') {
                        
                            sh 'npm install --legacy-peer-deps'  // Install dependencies
                            sh 'npm run build'                   // Build the Next.js app
                        
                    }
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                
                    script {
                        sh "docker build -t ${DOCKER_IMAGE_NAME}:latest ."
                    }
                
            }
        }
        stage('Push Docker Image to Docker Hub') {
            steps {
                script {
                    sh "echo ${DOCKER_HUB_CREDENTIALS_PSW} | docker login -u ${DOCKER_HUB_CREDENTIALS_USR} --password-stdin"
                    sh "docker push ${DOCKER_IMAGE_NAME}:latest"
                }
            }
        }
    }
    post {
        always {
            echo "Cleaning up Docker images..."
            sh "docker rmi ${DOCKER_IMAGE_NAME}:latest || true"
        }
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed."
        }
    }
}
