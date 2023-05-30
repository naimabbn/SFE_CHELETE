package com.chelete.demo.client;

import java.io.ByteArrayOutputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itextpdf.text.Document;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.Element;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;





@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/chelete/client")
public class clientController {

    @Autowired
    private clientRepository repository;

    //GET ALL CLIENTS
    @GetMapping("/clients")
    public List<client> getAllClients(){
     return repository.findAllSortedByIdDesc();
    
    }

    //ADD CLIENT
    @PostMapping("/clients")
    public client AddClient(@RequestBody client C){
      return repository.save(C);
    }
    
      //GET CLIENT BY ID
      @GetMapping("clients/{id}")
      public ResponseEntity<client> GetClientById(@PathVariable Long id){
        client client =repository.findById(id).orElseThrow(()-> new RessourceNotFoundException("Product Not found!"));
        return ResponseEntity.ok(client );
      }
    //UPDATE CLIENT
    @PutMapping("/clients/{id}")
    public ResponseEntity<client> UpdateClient(@PathVariable Long id , @RequestBody client Newclient){
      client client =repository.findById(id).orElseThrow(()-> new RessourceNotFoundException("Product Not found!"));
      client.setICE(Newclient.getICE());
      client.setNom(Newclient.getNom());
      client.setAddresse(Newclient.getAddresse());

      client apdatedClient =repository.save(client);
      return ResponseEntity.ok(apdatedClient);
    }


    //DELETE Client

    @DeleteMapping("/clients/{id}")
    public ResponseEntity<String> DeleteClient(@PathVariable Long id){
      client client =repository.findById(id).orElseThrow(()-> new RessourceNotFoundException("Product Not found!"));
      repository.delete(client);
      return ResponseEntity.ok("Deleted");
    }

    //GENERATE PDF
    @GetMapping("/pdf")
            public ResponseEntity<byte[]> generatePdf() throws Exception {
            List<client> clients= repository.findAll();


            Document document = new Document(PageSize.A4, 60, 60, 150, 100);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            /*PdfWriter writer =*/PdfWriter.getInstance(document, baos);
            ////////
            
            document.open();
            //int page = writer.getPageNumber();
   
    
          PdfPTable table = new PdfPTable(3); // 3 columns
          table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER); // set the horizontal alignment of the cells
          table.setHeaderRows(1); // set the first row as the header row
          table.getDefaultCell().setMinimumHeight(30);
          table.setWidthPercentage(100);
          table.setSpacingBefore(20f);
          table.setSpacingAfter(10f);
          float[] columnWidths = {2f, 4f, 6f }; // column widths in relative units
          table.setWidths(columnWidths);
          PdfPCell cell1 = new PdfPCell(new Phrase("ICE", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11)));cell1.setHorizontalAlignment(Element.ALIGN_CENTER);cell1.setPadding(5f);
          PdfPCell cell2 = new PdfPCell(new Phrase("CLIENT", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11)));cell2.setHorizontalAlignment(Element.ALIGN_CENTER);cell1.setPadding(5f);
          PdfPCell cell3 = new PdfPCell(new Phrase("ADDRESSE", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11)));cell3.setHorizontalAlignment(Element.ALIGN_CENTER);cell1.setPadding(5f);

          table.addCell(cell1);
          table.addCell(cell2);
          table.addCell(cell3);

          for (client client : clients) {
            table.addCell(String.valueOf(client.getICE()));
            table.addCell(client.getNom());
            table.addCell(client.getAddresse());
          
          }

          DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
          String formattedDate = dateFormat.format(new Date());
          Paragraph dateParagraph = new Paragraph("Date: " + formattedDate);
          Paragraph titre = new Paragraph("CHELETE CLIENTS", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 15));
          titre.setAlignment(Element.ALIGN_CENTER);
          titre.setSpacingBefore(10);

          document.add(dateParagraph);
          document.add(titre);
          document.add(table);
          document.close();

          HttpHeaders headers = new HttpHeaders();
          headers.setContentType(MediaType.APPLICATION_PDF);
          headers.setContentDispositionFormData("filename", "Clients.pdf");
          headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
          ResponseEntity<byte[]> response = new ResponseEntity<>(baos.toByteArray(), headers, HttpStatus.OK);
          return response;

  }

  

}
