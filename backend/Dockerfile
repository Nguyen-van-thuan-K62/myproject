FROM php:8.2-apache

# Cài extension Laravel
RUN docker-php-ext-install pdo pdo_mysql

# Bật rewrite
RUN a2enmod rewrite

# Cài composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy composer files trước để cache layer
COPY composer.json composer.lock ./

# Cài dependency
RUN composer install --no-dev --optimize-autoloader

# Copy toàn bộ source code
COPY . .

# Đổi Apache document root sang public
RUN sed -i 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf

# Permission
RUN chown -R www-data:www-data /var/www/html