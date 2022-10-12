## Workshop Nerdearla


### Creación del ambiente de trabajo



1. Ingresar a: [https://us-east-1.console.aws.amazon.com/cloud9/home/create](https://us-east-1.console.aws.amazon.com/cloud9/home/create)
2. Crear un nombre al espacio de Cloud9 y darle clic en siguiente.
3. Configuraremos el tipo de instancia en t3.small para este workshop y dejamos el resto de valores por defecto.
4. Ejecutamos los siguientes comandos para descargar AWS Copilot. \
 curl -Lo copilot https://github.com/aws/copilot-cli/releases/latest/download/copilot-linux && chmod +x copilot && sudo mv copilot /usr/local/bin/copilot && copilot —help
5. Iniciamos el servicio de docker: \
 sudo service docker **start**
6. Creamos una politica para Cloud9 llamada Cloud9Nerdearla  con la siguiente estructura: \
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

7. Creamos un rol para Cloud9 seleccionando el tipo AWS Service y seleccionamos EC2 [https://us-east-1.console.aws.amazon.com/iamv2/home?region=us-east-1#/roles/create?step=selectEntities](https://us-east-1.console.aws.amazon.com/iamv2/home?region=us-east-1#/roles/create?step=selectEntities) 
8. Y le asignamos la política creada previamente.
9. Ahora vamos a cambiar el rol de la instancia de EC2 que usaremos en el laboratorio. Vamos a [https://us-east-1.console.aws.amazon.com/ec2/home?region=us-east-1#Instances:instanceState=running](https://us-east-1.console.aws.amazon.com/ec2/home?region=us-east-1#Instances:instanceState=running) 
10. Y seleccionamos la instancia que contenga Cloud9 en el nombre y que esté activa. Para luego darle clic en Actions>Security>Modify IAM role \


<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image1.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image1.png "image_tooltip")

11. Una vez ahí nos pedirá indicar el rol, ahí seleccionaremos el recién creado.
12. Ahora vamos a poner manos a la obra, comenzamos clonando el repositorio del workshop. \
git **clone** **[https://github.com/jyapurv/cdk-and-copilot](https://github.com/jyapurv/cdk-and-copilot)**


### Trabajando con CDK



13. Nos ubicamos en el directorio cdk-and-copilot/aws-cdk Y exploramos los archivos del proyecto.
14. Tenemos que instalar nuestro proyecto antes de comenzar, por lo que ejecutaremos \
npm **install**
15. Y ahora vamos a ver como CDK termina siendo la abstracción de CloudFormation ejecutando \
**cdk** synth
16. Y finalmente vamos a ejecutar los cambios con  \
npm **run-script **deploy
17. Vamos a intentar hacer un cambio en el proyecto y ver los cambios con \
npm **run-script **diff


### Trabajando con Copilot



18. Nos ubicamos en el directorio copilot de nuestro repo y exploramos los archivos.
19. Necesitaremos configurar credenciales de AWS para poder continuar por lo que crearemos un usuario de terminal y ejecutaremos> \
**aws** configure
20. Ahora debemos iniciar el ambiente de trabajo, en nuestro caso será llamado test \
copilot env **init**
21. Con esto listo vamos a desplegar el ambiente test \
copilot env **deploy **–name test
22. Vamos a inicializar el servicio al cual le pondremos hits, seleccionaremos que nuestro servicio será Load Balanced Web Service. \
copilot svc **init**
23. Asi como en CDK acá tambien tenemos que crear nuestra tabla de DynamoDB, para ello usaremos el siguiente comando: \
copilot storage **init**
24. Usaremos los siguientes atributos:
    1. DynamoDB
    2. Table Name: hits
    3. Table PK: counter
    4. Table PK Type: String
    5. Sort Table: N
25. Ya estamos listos para el siguiente paso, que será desplegar la solución.

    copilot **deploy**
