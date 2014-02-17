##Mongoose Data administration

a [mongoose] example application whose data can be edited by [gform-admin].

### Installation


    git clone git@github.com:stemey/mongoose-admin-example.git
    cd mongoose-admin-example
    npm install
    node app


The rest services are now listening on localhost:3333/


Install [gform-admin] client as described. Open your browser to the location described there and start administrating your mongoose data.

The default configuration of [gform-admin] already includes this server ([see here](http://github.com/stemey/gform-admin/blob/master/src/app/services.json)).

### Architecture

This application uses [mongoose] to create persistent models. Rest services for crud operations for these models are provided by [baucis].
The models schemas and extra meta information are exposed via rest services by [baucis-gform].
[gform-admin] dynamically generates master detail views based on the [gform] schemas provided by baucis-gform.
This application uses CORS to allow xdomain access.


[gform]: (https://github.com/stemey/dojo-generate-form)
[mongoose]: (https://github.com/LearnBoost/mongoose)
[gform-admin]: (https://github.com/stemey/gform-admin)
[baucis-gform]: (https://github.com/stemey/baucis-gform)
[baucis]: (https://github.com/wprl/baucis)