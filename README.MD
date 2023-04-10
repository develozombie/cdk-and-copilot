# Workshop CDK and Copilot


## Creación del ambiente de trabajo



1. Ingresar a: [https://us-east-1.console.aws.amazon.com/cloud9/home/create](https://us-east-1.console.aws.amazon.com/cloud9/home/create)
2. Crear un nombre al espacio de Cloud9 y darle clic en siguiente.
3. Configuraremos el tipo de instancia en t3.small para este workshop y dejamos el resto de valores por defecto.
4. Ejecutamos los siguientes comandos para descargar AWS Copilot. \
`curl -Lo copilot https://github.com/aws/copilot-cli/releases/latest/download/copilot-linux && chmod +x copilot && sudo mv copilot /usr/local/bin/copilot && copilot --help`
5. Iniciamos el servicio de docker: \
`sudo service docker start`
6. Ahora vamos a Settings y desactivamos las credenciales administradas
7. Creamos una política para Cloud9 llamada Cloud9Nerdearla  \
https://us-east-1.console.aws.amazon.com/iam/home#/policies$new?step=edit \
con la siguiente estructura: \
```json
{
      "Version": "2012-10-17",
      "Statement": [
        {
          "Sid": "Stmt1665503038650",
          "Action": "*",
          "Effect": "Allow",
          "Resource": "*"
        }
      ]
 }
```   
8. Creamos un rol para Cloud9 seleccionando el tipo AWS Service y seleccionamos EC2 [https://us-east-1.console.aws.amazon.com/iamv2/home?region=us-east-1#/roles/create?step=selectEntities](https://us-east-1.console.aws.amazon.com/iamv2/home?region=us-east-1#/roles/create?step=selectEntities) 
9. Y le asignamos la política creada previamente.
10. Ahora vamos a cambiar el rol de la instancia de EC2 que usaremos en el laboratorio. Vamos a [https://us-east-1.console.aws.amazon.com/ec2/home?region=us-east-1#Instances:instanceState=running](https://us-east-1.console.aws.amazon.com/ec2/home?region=us-east-1#Instances:instanceState=running) 
11. Y seleccionamos la instancia que contenga Cloud9 en el nombre y que esté activa. Para luego darle clic en Actions>Security>Modify IAM role
12. Una vez ahí nos pedirá indicar el rol, ahí seleccionaremos el recién creado.
13. Finalmente crearemos un usuario programático y le asignaremos la política creada previamente. 
14. Necesitaremos configurar credenciales de AWS para poder continuar por lo que crearemos un usuario de terminal y ejecutaremos> \
`aws configure`
15. Ahora vamos a poner manos a la obra, comenzamos clonando el repositorio del workshop. \
`git clone https://github.com/develozombie/cdk-and-copilot`


## Trabajando con CDK



16. Nos ubicamos en el directorio cdk-and-copilot/aws-cdk Y exploramos los archivos del proyecto.
17. Tenemos que instalar nuestro proyecto antes de comenzar, por lo que ejecutaremos \
`npm install`
18. Y ahora vamos a ver como CDK termina siendo la abstracción de CloudFormation ejecutando \
`cdk synth`
19. Y finalmente vamos a ejecutar los cambios con  \
`npm run-script deploy`
20. Nos saldrá un error, eso es debido a que no hemos podido asociar una cuenta a nuestro proyecto \
`cdk bootstrap`
21. Vamos a intentar hacer un cambio en el proyecto y ver los cambios con \
`npm run-script diff`


## Trabajando con Copilot



22. Nos ubicamos en el directorio copilot de nuestro repo y exploramos los archivos.
23. Ahora debemos iniciar el ambiente de trabajo: \
`copilot init`
24. Nos pedirá un nombre de aplicación, la llamaremos **hits**
25. Vamos a llamar a nuestro servicio **hits**, cuando nos lo pida.
26. Esperamos a que el servicio termine de configurarse.
27. Nos preguntará si queremos desplegar un ambiente de test y ponemos que sí (Y)
28. Así como en CDK acá también tenemos que crear nuestra tabla de DynamoDB, para ello usaremos el siguiente comando: \
`copilot storage init`
29. Usaremos los siguientes atributos:
    1. DynamoDB
    2. Table Name: hits
    3. Table PK: counter
    4. Table PK Type: String
    5. Sort Table: N
30. Ya estamos listos para el siguiente paso, que será desplegar la solución.
`copilot deploy`
