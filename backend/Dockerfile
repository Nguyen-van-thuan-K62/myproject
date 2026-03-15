FROM php:8.2-apache

# cài extension cần cho laravel
RUN docker-php-ext-install pdo pdo_mysql

# bật rewrite
RUN a2enmod rewrite

# copy source
COPY . /var/www/html

# đổi document root sang public
RUN sed -i 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf

# permission
RUN chown -R www-data:www-data /var/www/html