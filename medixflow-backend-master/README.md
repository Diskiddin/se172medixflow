# medixflow-backend

install with npm install
start with `npm start` or `npm start dev` to update on changes.
requires mongodb called medixflow `"mongodb://127.0.0.1:27017/medixflow`
for details check config.ts

provides a rest api at http://localhost:8081/api/v1/Request
The api is provided by express restify mongoose: https://florianholzapfel.github.io/express-restify-mongoose/.

sample json for post request{ "guestName": "Marcel Schmidberger", "roomNumber": "7", "taskDescription": "Ich hätte gerne etwas zu trinken"}

## Docker

Build Container with:

``
docker build -t medixflow-backend .

``

Set your MONGODB_URI to the flowing to use the cloud db in your dev environment:

```
mongodb+srv://medixflow-app:MQeHt8k85eTve.s@medixflow-db-mgvqg.mongodb.net/test?retryWrites=true
```

Run Container With:

```
docker run -p 8081:8081 -e MONGODB_URI="mongodb+srv://medixflow-app:MQeHt8k85eTve.s@medixflow-db-mgvqg.mongodb.net/test?retryWrites=true" medixflow-backend --name medixflow-backend
```


## Deployment

- the containers are build in the CI and pushed to a private Google Container Registry
- they are then deployed to a Kubernetes Cluster
- The backend deployment can be reached over the following endpoint:
  
- http://35.244.179.60/api/v1/Request
- oder http://35.244.179.60 für den health check

### Use HTTPS in a kubernetes cluster

- you need certificates
- mount them to the pod 
- have https endpoint in your nodejs app

#### To get proper certificates use certbot:

- use certbot in ubuntu for windows
- `certbot -d DOMAIN_NAME --manual --logs-dir certbot --config-dir certbot --work-dir certbot --preferred-challenges dns certonly`
- setze den TXT record
- überprüfe ob record richtig gesetzt wurde https://mxtoolbox.com/SuperTool.aspx?action=txt%3a_acme-challenge.medixflow.de&run=toolpage
- generierung der zertifikate
- take content of `privkey.pem` and copy to `tls.key` and content of `fullchain.pem` and copy to `tls.crt`
- generate Kubernetes secret with: `kubectl create secret tls medixflow-letsencrypt-tls --cert="tls.crt" --key="tls.key"`


Generate Self-signed certificates with

``
openssl req -new -newkey rsa:2048 -nodes -x509 -subj '//CN=self-signed.ignore' -days 1800 -keyout tls.key -out tls.crt
``

kubectl create secret tls yourdomain-tls --cert="tls-hello.crt" --key="tls-hello.key"

### Guides:

https://github.com/GoogleCloudPlatform/kubernetes-engine-samples/tree/master/hello-app-tls

https://www.mongodb.com/blog/post/modern-distributed-application-deployment-with-kubernetes-and-mongodb-atlas

https://github.com/cefjoeii/mern-crud

## Database

- our DB is a cloudhosted MongoDB atlas instance
- URL: https://cloud.mongodb.com/v2#/clusters
- You have to whitelist the ips that can access the DB, right now all IPs are whitelisted

