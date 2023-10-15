# Auto-Generated Api Client
The project's objective is to streamline the integration of a React application with a .NET API. It offers an illustrative guide on automating the generation of an API client for your React frontend from an OpenAPI Document created with Swagger.

1. Generate an OpenAPI Documentation Using Swagger During Your Build Process
2. Create a TypeScript API Client Using Your OpenAPI Document
3. Seamlessly Incorporate the TypeScript API Client into Your React Application

## Generate an OpenAPI Documentation Using Swagger During Your Build Process
To generate the OpenAPI document, we'll employ the Swashbuckle CLI tool. It's crucial to ensure that you have the identical version of Swashbuckle.AspNetCore as Swashbuckle.AspNetCore.CLI. In my instance, I'm utilizing version 6.5.0 for both components.

Follow the steps below to install the Swashbuckle CLI tool (skip the first line if you already have a .NET tool manifest file):

```bash
# If you don't have a .NET tool manifest file, skip this line
dotnet new tool-manifest
# Install Swashbuckle CLI tool version 6.5.0 (replace with your version)
dotnet tool install Swashbuckle.AspNetCore.Cli --version 6.5.0
```

This command will generate a .config folder that includes a dotnet-tools.json file, as shown below:

```json
{
  "version": 1,
  "isRoot": true,
  "tools": {
    "swashbuckle.aspnetcore.cli": {
      "version": "6.5.0",
      "commands": [
        "swagger"
      ]
    }
  }
}
```

Now that you've installed the Swagger CLI tool, make sure to use the AddSwaggerGen function in your application. This step is essential for the Swagger CLI tool to function properly. The code snippet below illustrates how to implement this:

```csharp
// You can find the complete code in the Program.cs file
builder.Services.AddSwaggerGen();
```

Next, we'll need to add a post-build event to our project in the *.csproj file. This event will execute the Swashbuckle CLI tool to generate the OpenAPI document. The code snippet below illustrates how to implement this (replace v1 with your API version):

```xml
<Target Name="PostBuild" AfterTargets="PostBuildEvent">
	<Exec Command="dotnet tool restore" />
	<Exec Command="dotnet swagger tofile --output OutputFileName.json $(OutputPath)\$(AssemblyName).dll v1" />
</Target>
```

The Swagger file is now automatically generated whenever you build your application. This OpenAPI document has multiple use cases; for instance, you can use it in Postman or to create a .Net API client. However, we'll specifically explore its usage in conjunction with React.

## Create a TypeScript API Client Using Your OpenAPI Document
To create the API client, we will use the OpenAPI Generator CLI tool. This tool enables the automatic generation of API client libraries, server stubs, documentation, and configuration files based on an OpenAPI Specification. The code snippet provided below demonstrates how to install the OpenAPI Generator CLI tool using npm:

```bash
npm i @openapitools/openapi-generator-cli
```

Next, let's perform the following steps to create a folder named "scripts" and a file called "generate_api.sh." This file will contain the command for generating the API client. In this example, we're using the "typescript-fetch" generator, but you have the flexibility to choose any other generator that best suits your requirements. The code snippet below provides a clear example of how to do this:

```bash
# Modify the file path and name to match your specific requirements
SWAGGER_FILE=./pathToApiSpecFile/OutputFileName.json
# Adjust the output folder to your specific needs
npx @openapitools/openapi-generator-cli generate -i $SWAGGER_FILE -g typescript-fetch -o ./src/generated-api
```

The last step is to add the following script to your package.json file:

```json
"scripts": {
    # Add the following line to your package.json file
    "generate-api": "bash scripts/generate_api.sh"
  }
```

Now you can call the script by running the following command:

```bash
npm run generate-api

# This will create a folder called "generated-api" in your src folder
# Containing the API client and models.
```

## Seamlessly Incorporate the TypeScript API Client into Your React Application
To clarify the process of incorporating the API client into our React application, we'll break it down into three main steps:

### Create the API Context:

In this step, we create an API context that will manage the state of our application using React Context. We'll store the API client and make it accessible throughout the application.

First, create a folder named "Context" and within it, create a file called "ApiContext.ts" with the following content:

```typescript
import React from "react";
import {WeatherForecastApi} from "../generated-api";
// Create a context for the WeatherForecastApi
export const ApiContext = React.createContext<WeatherForecastApi>({} as WeatherForecastApi)
// Create a custom hook for accessing the API client from the context
export const useApi = () => React.useContext(ApiContext);
```

### Add the Context Provider:

Now, we need to add the Context Provider to our main application file, typically "App.tsx." This provider will make the API client accessible to all child components.

Here's an example of how to set up the provider in "App.tsx":

```typescript
const App = () => {
    // Create an instance of the auto-generated WeatherForecastApi Client.
    const api = React.useMemo(() => {
            const config = new Configuration({basePath: "http://localhost:5176"});
            return new WeatherForecastApi(config)
        }
        , [])

    return (
        // Provide the API client to all child components via the context.
        <ApiContext.Provider value={api}>
            <WeatherPage/>
        </ApiContext.Provider>
    )
}

export default App
```

### Using the API Client:

Now that the API client is available through the context, you can easily use it in any component that requires it. For example, in your "WeatherPage.tsx" file or any other component:

```typescript
import React from "react";
import { useApi } from "./Context/ApiContext.ts"; // Import the custom hook.

const WeatherPage = () => {
    const api = useApi(); // Access the API client using the custom hook.
    
    // Now you can use the 'api' variable to make API requests.
    
    return (
        // Your component's JSX and logic here.
    );
}

export default WeatherPage;
```

By following these steps, you have successfully incorporated the API client into your React application and can access it from any component that needs to make API requests.

## References
- [OpenAPI Specification](https://swagger.io/specification/)
- [Swashbuckle CLI: Automating ASP.NET Core API Swagger Definitions During Build](https://webcache.googleusercontent.com/search?q=cache:https://tonylunt.medium.com/swashbuckle-cli-automating-asp-net-core-api-swagger-definitions-during-build-f3ee2b8e857a)
- [GitHub: openapi-generator-cli](https://github.com/OpenAPITools/openapi-generator-cli)
- [HOW TO GENERATE API CLIENT CODE IN REACT (NATIVE) APPS](https://andreaslydemann.com/how-to-generate-api-client-code-in-react-native-apps/)
