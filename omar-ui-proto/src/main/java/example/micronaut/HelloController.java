package example.micronaut;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Produces;
import io.micronaut.core.io.ResourceResolver;
import io.micronaut.http.server.types.files.StreamedFile;

@Controller("/omar-ui-proto")
public class HelloController {
//    @Inject
//    ResourceResolver res;
//
//    @Get("/{[path:[^\\.]*}")
//    @Secured(SecurityRule.IS_ANONYMOUS)
//    @Produces(MediaType.TEXT_HTML)
//
//    public HttpResponse<?> refresh(HttpRequest<?> request) {
//        StreamedFile indexFile = new StreamedFile(res.getResource("classpath:public/index.html").get());
//        return HttpResponse.ok(indexFile);
//    }
    @Produces(MediaType.TEXT_PLAIN)
    @Get("/{name}")
    HttpResponse<String> hello(String name) {
        return HttpResponse.ok("Hello SCOTTY!, " + name + "!");
    }

}
