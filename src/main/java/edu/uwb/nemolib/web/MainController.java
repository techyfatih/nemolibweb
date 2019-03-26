package edu.uwb.nemolib.web;

import edu.uwb.nemolib.Graph;
import edu.uwb.nemolib.GraphParser;
import edu.uwb.nemolib.NetworkMotif;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;

@RestController
public class MainController {

    @PostMapping("/findmotifs")
    public String findmotifs(
            HttpServletRequest                      request,
            @RequestParam(required = false)         MultipartFile graphFile,
            @RequestParam(required = false)         String graphText,
            @RequestParam(defaultValue = "3")       int motifSize,
            @RequestParam(defaultValue = "1000")    int randGraphCount
    ) {
        String addr = request.getRemoteAddr();
        System.out.println("Received request from " + addr);
        Graph graph = null;
        if (graphFile != null) {
            System.out.print(addr + ": file upload");
            try {
                graph = GraphParser.parse(graphFile.getInputStream());
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else if (graphText != null) {
            System.out.print(addr + ": text");
            graph = GraphParser.parse(Arrays.asList(graphText.split("\\r?\\n")));
        }
        System.out.println(" (motif size: " + motifSize + ", randGraphCount: " + randGraphCount + ")");

        if (graph == null) {
            System.out.println(addr + ": Invalid graph");
            return "Invalid input provided; please upload a valid file or paste valid text describing the graph.";
        }
        if (motifSize < 3) {
            System.out.println(addr + ": Invalid motif size");
            return "Motif size must be greater than or equal to 3.";
        }
        if (randGraphCount < 1) {
            System.out.println(addr + ": Invalid rand graph count");
            return "Number of random networks must be greater than or equal to 1.";
        }

        final long startTime = System.currentTimeMillis();
        String networkMotifs = NetworkMotif.findNetworkMotifs(graph, motifSize, randGraphCount).toString();
        final long executionTime = System.currentTimeMillis() - startTime;
        System.out.println(addr + ": Finished request. Time: " + executionTime);
        return networkMotifs + "\nExecution Time: " + executionTime + "ms";
    }
}
