package omar.ui.proto;

import io.micronaut.runtime.Micronaut

class Application
{
	static void main( String[] args )
	{
		if ( !( System.getenv( 'MICRONAUT_ENVIRONMENTS' ) || System.getProperty( 'micronaut.environments' ) ) )
		{
			System.setProperty( 'micronaut.environments', 'default' )
		}
		
		Micronaut.run( Application )
	}
}