<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['https://myproject-five-black.vercel.app'],

    'allowed_headers' => ['*'],

    'supports_credentials' => false,

];