# Trirea : How it works ?

For trirea works, you need to have a:
- User register
- This user should be subscribed to services he wants to use
- If the services need a token (like twitter, facebook, etc), you need to implement an oauth to fetch his token and it in database
- Then for each services you should have triggers & reactions
  - Triggers & reactions should be stored in database
  - Triggers & reactions should have a file which contains the ``start`` function in the ``./jobs/`` folder
  - You should respect the nomenclature ``./jobs/{triggers|reactions}/{service}/{name}.{trigger|reaction}.ts``
- Triggers could have triggerInputs or ReactionInputs
- Then you can create Trirea