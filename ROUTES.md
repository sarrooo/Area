# 📡 Backend routes
All objects mentioned here are defined in the [ServerTypes.ts file](./server/ServerTypes.ts), non specified return status are classics and conventionally defined [here](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes).

### Trirea's routes :
- **Create Trirea** `POST /trirea`  
➡️ New trirea object, the ID can be undefined  
⬅️ New Trirea object created
- **Read Trirea** `GET /trira/:id`  
➡️ Trirea ID  
⬅️ Trirea object
- **Update Trirea** `POST /trirea/:id`  
➡️ Updated Trira object with the correct ID
- **Delete Trirea** `POST /trirea/delete/:id`  
➡️ Trirea ID  
⚠️ Users can only delete his own Trirea's, or admin right are required
- **Search Trirea** : `GET /trirea`  
➡️ Search params :  
&nbsp;&nbsp;&nbsp;&nbsp;⚫️ `user_id` : `string`  
&nbsp;&nbsp;&nbsp;&nbsp;⚫️ `active` : `boolean`  
&nbsp;&nbsp;&nbsp;&nbsp;⚫️ `max` : `number`  
⬅️ List of Trirea objects  
⚠️ Users can only search for his own Trirea's, or admin right are required
### Services routes :
- **Create Service** `POST /service`  
➡️ New Service object, the ID can be undefined  
⬅️ New Service object created  
⚠️ Admin right are required
- **Read Service** `GET /service/:id`  
➡️ Service ID  
⬅️ Service object
- **Update Service** `POST /service/:id`  
➡️ Updated Service object with the correct ID  
⚠️ Admin right are required
- **Delete Service** `POST /service/delete/:id`  
➡️ Service ID  
⚠️ Admin right are required
- **Search Service** `GET /service`  
➡️ Search params :  
&nbsp;&nbsp;&nbsp;&nbsp;⚫️ `max` : `number`  
⬅️ List of Service objects
### Triggers routes :
- **Create Trigger** `POST /trigger`  
➡️ New Trigger object, the ID can be undefined  
⬅️ New Trigger object created  
⚠️ Admin right are required
- **Read Trigger** `GET /trigger/:id`  
➡️ Trigger ID  
⬅️ Trigger object
- **Update Trigger** `POST /trigger/:id`  
➡️ Updated Trigger object with the correct ID  
⚠️ Admin right are required
- **Delete Trigger** `POST /trigger/delete/:id`  
➡️ Trigger ID  
⚠️ Admin right are required
- **Search Trigger** `GET /trigger`  
➡️ Search params :  
&nbsp;&nbsp;&nbsp;&nbsp;⚫️ `max` : `number`  
⬅️ List of Trigger objects
### Reactions routes :
- **Create Reaction** `POST /reaction`  
➡️ New Reaction object, the ID can be undefined  
⬅️ New Reaction object created  
⚠️ Admin right are required
- **Read Reaction** `GET /reaction/:id`  
➡️ Reaction ID  
⬅️ Reaction object
- **Update Reaction** `POST /reaction/:id`  
➡️ Updated Reaction object with the correct ID  
⚠️ Admin right are required
- **Delete Reaction** `POST /reaction/delete/:id`  
➡️ Reaction ID  
⚠️ Admin right are required
- **Search Reaction** `GET /reaction`  
➡️ Search params :  
&nbsp;&nbsp;&nbsp;&nbsp;⚫️ `max` : `number`  
⬅️ List of Reaction objects
### Trigger Input Types routes :
- **Create Trigger Input Type** `POST /input/trigger`  
➡️ New Input object, the ID can be undefined  
⬅️ New Input object created  
⚠️ Admin right are required
- **Read Trigger Input Type** `GET /input/trigger/:id`  
➡️ Input ID  
⬅️ Input object
- **Update Trigger Input Type** `POST /input/trigger/:id`  
➡️ Updated Input object with the correct ID  
⚠️ Admin right are required
- **Delete Trigger Input Type** `POST /input/trigger/delete/:id`  
➡️ Input ID  
⚠️ Admin right are required
- **Search Trigger Input Type** `GET /input/trigger`  
➡️ Search params :  
&nbsp;&nbsp;&nbsp;&nbsp;⚫️ `max` : `number`  
⬅️ List of Input objects
### Reaction Input Types routes :
- **Create Trigger Input Type** `POST /input/reaction`  
➡️ New Input object, the ID can be undefined  
⬅️ New Input object created  
⚠️ Admin right are required
- **Read Reaction Input Type** `GET /input/reaction/:id`  
➡️ Input ID  
⬅️ Input object
- **Update Reaction Input Type** `POST /input/reaction/:id`  
➡️ Updated Input object with the correct ID  
⚠️ Admin right are required
- **Delete Reaction Input Type** `POST /input/reaction/delete/:id`  
➡️ Input ID  
⚠️ Admin right are required
- **Search Reaction Input Type** `GET /input/reaction`  
➡️ Search params :  
&nbsp;&nbsp;&nbsp;&nbsp;⚫️ `max` : `number`  
⬅️ List of Input objects
### Trigger Output Types routes :
- **Create Trigger Output Type** `POST /output/trigger`  
➡️ New Output object, the ID can be undefined  
⬅️ New Output object created  
⚠️ Admin right are required
- **Read Trigger Output Type** `GET /output/trigger/:id`  
➡️ Output ID  
⬅️ Output object
- **Update Trigger Output Type** `POST /output/trigger/:id`  
➡️ Updated Output object with the correct ID  
⚠️ Admin right are required
- **Delete Trigger Output Type** `POST /output/trigger/delete/:id`  
➡️ Output ID  
⚠️ Admin right are required
- **Search Trigger Output Type** `GET /output/trigger`  
➡️ Search params :  
&nbsp;&nbsp;&nbsp;&nbsp;⚫️ `max` : `number`  
⬅️ List of Output objects
### Subscriptions routes :
- **Desfine if subscribed** `POST /subscription`  
➡️ In body : serviceId, and subscribed boolean  