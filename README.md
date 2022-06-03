# **Proyecto Platzi Movies**

Se basa en mostrar una una interfaz que se comunique con una API pública para consultar películas y mostrarlas en el frontend de manera dinámica. La aplicación sólo está disponible para dispositivos Mobile y tablet hasta 600px de ancho.

## **Estado actual**

Proyecto actualmente producción. Url del proyecto: [platzi-movie.netlify.app](https://platzi-movie.netlify.app/).

## **Maquetación del proyecto**

La maquetación del proyecto fue desarrollada en figma y lo puedes visualizar aquí: [Click Aquí](https://www.figma.com/file/AYlJHq4RwChusnwFzMSOjd/Platzi_Movies)

## **Requisitos para el entorno de desarrollo**

### **Requisitos de versionamiento git en los branch**

En los branch se utilizará la convensión de acuerdo a dos categorias de ramas: ramas regulares y temporales.

**Ramas Regulares:** Estas ramas estarán disponibles en su repositorio de forma permanente. Su convención de nomenclatura es simple y directa.
- **Development  (*dev*)** es la principal rama de desarrollo. La idea de la rama de desarrollo es realizar cambios en ella y evitar que los desarrolladores realicen cambios en la rama main directamente. Los cambios en la rama de desarrollo se someten a revisiones y después de la prueba, se fusionan con la rama main.
- **Master (*main*)** es la rama predeterminada disponible en el repositorio de Git. Debe ser estable todo el tiempo y no permitirá ningún registro directo. Solo puede fusionarlo después de la revisión del código. Todos los miembros del equipo son responsables de mantener al maestro estable y actualizado.
- **QA/Test (*QA/test*)** contiene todo el código para las pruebas de QA y las pruebas de automatización de todos los cambios implementados. Antes de que cualquier cambio vaya al entorno de producción, debe someterse a las pruebas de control de calidad para obtener una base de código estable.
- **Staging (*staging*)** contiene características probadas que las partes interesadas querían que estuvieran disponibles para una demostración o una propuesta antes de pasar a la producción. Aquí se toman las decisiones si una característica debe finalmente incorporarse al código de producción.

**Ramas Temporales:** estas son las ramas que se pueden crear y eliminar cuando sea necesario. Pueden ser los siguientes:
- **Feature (*feature*)** cualquier cambio de código para un nuevo módulo o caso de uso debe realizarse en una rama de funciones. Esta rama se crea en función de la rama de desarrollo actual.
- **Bug Fix (*bugfix*)** si los cambios de código realizados desde la rama de funciones fueron rechazados después de un lanzamiento, sprint o demostración, cualquier corrección necesaria después de eso debe hacerse en la rama de corrección de errores.
- **Hot Fix (*hotfix*)** Si es necesario reparar un bloqueador, hacer un parche temporal, aplicar un marco crítico o un cambio de configuración que debe manejarse de inmediato, debe crearse como una revisión. No sigue la integración programada del código y podría fusionarse directamente con la rama de producción y luego en la rama de desarrollo.
- **Experimental (*experimental*)** Cualquier nueva característica o idea que no sea parte de un lanzamiento o un sprint. Una rama para jugar.
- **Build (*build*)** Una rama específicamente para crear artefactos de compilación específicos o para ejecutar ejecuciones de cobertura de código.
- **Release (*release*)** Una rama para etiquetar una versión de lanzamiento específica.
- **Merging (*merge*)** Una rama temporal para resolver conflictos de fusión, generalmente entre el último desarrollo y una función o rama Hotfix. Esto también se puede utilizar si dos ramas de una función en la que están trabajando varios desarrolladores deben fusionarse, verificarse y finalizarse.

El nombre del branch debe estar estructurado de la siguiente forma:

```
<token>/<short-descriptive-name>
```

Ejemplos de nombre de brach:

```
feature/JIRA-1234_support-dark-theme
```

```
bugfix/more-gray-shades
```

```
hotfix/disable-endpoint-zero-day-exploit
```

```
experimental/dark-theme-support
```

```
release/myapp-1.01.123
```

Se recomienda encarecidamente utilizar el flujo de trabajo de [gitflow](https://www.atlassian.com/es/git/tutorials/comparing-workflows/gitflow-workflow) utilizado por la institución Atlassian.

### **Requisitos de versionamiento git en los commit**

El mensaje del commit debe estar estructurado de la siguiente forma:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

El commit contiene los siguientes elementos estructurales en el type:
- **build:** cambios que afectan el sistema de compilación o las dependencias externas (ámbitos de ejemplo: gulp, brócoli, npm)
- **ci:** cambios en nuestros archivos de configuración y scripts de CI (ámbitos de ejemplo: Travis, Circle, BrowserStack, SauceLabs)
- **chore:** actualización de tareas rutinarias, etc. sin cambio de código de producción (ejemplo: modificar el .gitignore, métodos internos privados)
- **docs:** cambios solamente en la documentación
- **feat:** introduce nuevas características en la base del código
- **fix:** corrige un error en la base del código
- **perf:** un cambio de código que mejora el rendimiento
- **refactor:** un cambio de código que no corrige un error ni agrega una característica, sólamente refactorizar código
- **style:** cambios que no afectan el significado del código (espacios en blanco, formato, punto y coma que faltan, etc.)
- **test:** agregar pruebas faltantes o corregir pruebas existentes

 Se puede agregar un ámbito al tipo de commit para proveer información contextual adicional y se escribe entre paréntesis, ejemplos, `feat(parser): add ability to parse arrays`, `feat(authentication): add autentication users in dashboard`.

Ejemplos de commit:

```
feat: allow provided config object to extend other configs
```

```
docs: correct spelling of CHANGELOG
```

```
feat(lang): added polish language
```

```
fix(player): fix player initialization
```

```
refactor(auth): improve refresh token logic
```

Referencias:  
[Git Branching Naming Convention: Best Practices](https://codingsight.com/git-branching-naming-convention-best-practices/)  
[Git Branch Naming Convention](https://dev.to/couchcamote/git-branching-name-convention-cch)  
[Flujo de trabajo de Gitflow](https://www.atlassian.com/es/git/tutorials/comparing-workflows/gitflow-workflow)  
[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)  
[The Angular Convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)

## **Instalación y funcionamiento**

Su funcionamiento será mediante el acceso a un servidor de prueba, para acceder a ello solo es necesario el un nvegador con acceso a internet y la url a la homepage.

## **Tecnologías Utilizadas**
- HTML5
- CSS3
- JasvsScript

## **Bugs y errores conocidos**

Sin bugs y errores conocidos

## **Actualizaciones pendientes**

Sin actualizaciones pendientes

## **Versiones**

- V1.0.0: Proyecto inicial con caracteríscas básicas
