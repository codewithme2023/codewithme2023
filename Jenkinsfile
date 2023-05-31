pipeline {
    agent any 
    docker {
        image 'mrc.microsoft.com/playwright:v1.17.2-focal'
    }
    stages{
        stage('example'){
            steps {
            bat 'npm version'
        }
        }
        stage('playwriteinstall'){
            steps{
                bat 'npm i -D @playwright/test'
                bat 'npx playwright install'
            }
        }
        stage('test'){
            steps{
                bat 'npx playwright test'
            }
        }
    }
    }
