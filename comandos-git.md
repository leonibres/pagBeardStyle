# Agregar todos los archivos al staging area

git add .

# O si prefieres agregar archivos específicos

git add frontend/
git add backend/

# Hacer un commit con un mensaje descriptivo

git commit -m "Inicialización del proyecto BeardStyle con frontend Vue y backend Django"

# Conectar a un repositorio remoto (reemplaza la URL con la de tu repositorio)

git remote add origin https://github.com/tu-usuario/pagBeardStyle.git

# Verificar que se haya agregado correctamente

git remote -v

# Subir los cambios a la rama principal (main o master)

git push -u origin main

# Si tu rama principal se llama 'master' en lugar de 'main'

git push -u origin master
