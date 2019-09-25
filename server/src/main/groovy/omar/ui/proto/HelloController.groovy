package omar.ui.proto;

import io.micronaut.context.annotation.Value
import io.micronaut.http.MediaType
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.Produces

@Controller( "/omar-ui-proto" )
class HelloController
{
	@Value( '${security-classification.background-color}' )
	String baseUrl
	
	@Get( "/config" )
	@Produces( MediaType.TEXT_PLAIN )
	public String index()
	{
		return baseUrl
	}
}
