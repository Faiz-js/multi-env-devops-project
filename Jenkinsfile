pipeline {
	agent any;

	stages {
		stage("check staging branch") {
			steps {
				script {
					echo "Running pipeline on branch: ${env.BRANCH_NAME}"
				}
			}
			when {
				branch "staging"
			}
		}

		stage("checkout code") {
			steps {
				checkout scm
			}			
		}

		stage("install frontend dependencies") {
			steps {
				dir("frontend") {
					sh "npm install"	
				}
			}	
		}

		stage("install backend dependencies") {
			steps {
				dir("backend") {
					sh "npm install"
				}
			}
		}

		stage("docker login") {
			steps {
				withCredentials([
					usernamePassword(
						credentialsId: "docker-hub-credentials",
						usernameVariable: "DOCKER_HUB_USERNAME",
						passwordVariable: "DOCKER_HUB_PASSWORD"
					)
				]) {
					sh 'echo "$DOCKER_HUB_PASSWORD" | docker login -u "$DOCKER_HUB_USERNAME" --password-stdin'
				}
			}	
		}

		stage("build frontend") {
			steps {
				sh "docker build -t faizjs/todo-frontend:${BUILD_NUMBER} ./frontend"
			}
		}

		stage("build backend") {
			steps {
				sh "docker build -t faizjs/todo-backend:${BUILD_NUMBER} ./backend"
			}
		}

		stage("push frontend image") {
			steps {
				sh "docker push faizjs/todo-frontend:${BUILD_NUMBER}"
			}
		}

		stage("push backend image") {
			steps {
				sh "docker push faizjs/todo-backend:${BUILD_NUMBER}"
			}
		}

		stage("run docker compose") {
			steps {
				sh '''
					export IMAGE_TAG="${BUILD_NUMBER}"
					docker compose down
					docker compose up --build -d
				'''
			}
		}
	}
}
