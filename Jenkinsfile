node {
   def mvnHome
   stage('Preparation') { // for display purposes
      // Get some code from a GitHub repository
      git 'https://github.com/zashraj/APIGEE_Reusable_Resources.git'
             
      //mvnHome = tool 'M3'
   }
    stage('Build Shared-flows'){
        sh "mvn -f SF-InitialCheck/pom.xml clean install -Ptest "
        sh "mvn -f SF-Logger/pom.xml clean install -Ptest "
        sh "mvn -f SF-Security-Check/pom.xml clean install -Ptest"
    }
   stage('Build Proxy') {
         sh "mvn -f API-Proxy-Template/pom.xml clean install -Ptest -Dapigee.config.options=update"
   }
}
