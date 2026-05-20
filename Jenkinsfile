pipeline {

    agent any

    environment {
        SONAR_TOKEN = credentials('Sonar')
    }

    stages {

        stage('Clone Repository') {
            steps {
                echo 'Repository Cloned'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Security Check') {
            steps {
                dir('backend') {
                    bat 'npm audit'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                bat """
                sonar-scanner ^
                -Dsonar.projectKey=student-task-tracker ^
                -Dsonar.sources=. ^
                -Dsonar.host.url=http://localhost:9000 ^
                -Dsonar.token=%SONAR_TOKEN%
                """
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t student-task-backend ./backend'
            }
        }

    }
}