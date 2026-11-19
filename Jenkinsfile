pipeline {
	agent any;

	tools {
		nodejs 'nodejs-24'
	}

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
				echo "Pulling code from github"
				checkout scm
			}			
		}

		stage("install frontend dependencies") {
			steps {
				echo "Installing frontend dependencies"
				dir("frontend") {
					sh "npm install"	
				}
			}	
		}

		stage("install backend dependencies") {
			steps {
				echo "Installing backend dependencies"
				dir("backend") {
					sh "npm install"
				}
			}
		}

		stage("docker login") {
			steps {
				echo "Login to docker hub using credentials"
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
				echo "Building frontend image"
				sh "docker build -t faizjs/todo-frontend:${BUILD_NUMBER} ./frontend"
			}
		}

		stage("build backend") {
			steps {
				echo "Building backend image"
				sh "docker build -t faizjs/todo-backend:${BUILD_NUMBER} ./backend"
			}
		}

		stage("push frontend image") {
			steps {
				echo "Pushing frontend image to docker hub"
				sh "docker push faizjs/todo-frontend:${BUILD_NUMBER}"
			}
		}

		stage("push backend image") {
			steps {
				echo "Pushing backend image to docker hub"
				sh "docker push faizjs/todo-backend:${BUILD_NUMBER}"
			}
		}

		stage("run docker compose") {
			steps {
				echo "Running docker compose command"
				sh '''
					export TAG_NAME="${BUILD_NUMBER}"
					cp /etc/staging-env/frontend/.env.staging ./frontend/.env.staging 
					cp /etc/staging-env/backend/.env.staging ./backend/.env.staging 
					docker compose down
					docker compose up --build -d
				'''
			}
		}
	}
}
