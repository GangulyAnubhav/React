import { app } from '@azure/functions';

import "./functions/login.js";
import "./functions/register.js";
import "./functions/planTrip.js";


app.setup({
    enableHttpStream: true,
});