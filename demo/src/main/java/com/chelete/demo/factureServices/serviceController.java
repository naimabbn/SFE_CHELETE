package com.chelete.demo.factureServices;

import java.io.ByteArrayOutputStream;
import java.text.DecimalFormat;
import java.time.format.DateTimeFormatter;
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

import com.chelete.demo.facture.facture;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/chelete/fservice")
public class serviceController {


    @Autowired
    private serviceRepository repository;

    //GET ALL services
    @GetMapping("/services")
    public List<fservice> getAllFactures(){
     return repository.findAllSortedByIdDesc();
    
    }

    //GET SERVICES BY ID_FACTURE
    @GetMapping("/services/{id}")
    public List<fservice> getAllServicesByFactureId( @PathVariable("id")  Long id) {
        return repository.findByFactureId(id);
    }

    
    //ADD SERVICE
    @PostMapping("/services")
      public fservice addService(@RequestBody fservice s){
        return repository.save(s);
    }


     //GET SERVICE BY ID
     @GetMapping("service/{id}")
     public ResponseEntity<fservice> GetFactureById(@PathVariable Long id){
       fservice service =repository.findById(id).orElseThrow(()-> new RessourceNotFoundException("Product Not found!"));
       return ResponseEntity.ok(service);
     }
 

     
    //UPDATE SERVICE
    @PutMapping("/services/{id}")
    public ResponseEntity<fservice> UpdateFacture(@PathVariable Long id , @RequestBody fservice newservice){
      fservice service =repository.findById(id).orElseThrow(()-> new RessourceNotFoundException("Facture Not found!"));
      service.setDesignation(newservice.getDesignation());
      service.setPu(newservice.getPu());
      service.setQuantite(newservice.getQuantite());
      service.setMontant(newservice.getMontant());
      fservice updatedService =repository.save(service);
      return ResponseEntity.ok(updatedService);
    }
    //DELETE SERVICE
    @DeleteMapping("/services/{id}")
    public ResponseEntity<String> DeleteService(@PathVariable Long id){
      fservice service =repository.findById(id).orElseThrow(()-> new RessourceNotFoundException("Product Not found!"));
      repository.delete(service);
      return ResponseEntity.ok("Deleted");
    }

    //GENERATE PDF
    @GetMapping("/pdf/{id}")
          public ResponseEntity<byte[]> generatePdf(@PathVariable("id")  Long id) throws Exception {
          List<fservice> services= repository.findByFactureId(id);


          Document document = new Document(PageSize.A4, 60, 60, 150, 100);
          ByteArrayOutputStream baos = new ByteArrayOutputStream();
          PdfWriter writer =PdfWriter.getInstance(document, baos);
          document.open();
          int page = writer.getPageNumber();
          DecimalFormat decimalFormat = new DecimalFormat("0.00");
    
          

          facture Myfacture=new facture();

          for (fservice service : services) {
            Myfacture=service.getFacture();
          }

          //////// TABLE 1
          PdfPTable table = new PdfPTable(3); // 3 columns
          table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER); // set the horizontal alignment of the cells
          table.setHeaderRows(1); // set the first row as the header row
          table.getDefaultCell().setMinimumHeight(30);
          table.setWidthPercentage(40);
          table.setSpacingBefore(10f);
          table.setSpacingAfter(10f);
          float[] columnWidths = {3f, 2f, 2f }; // column widths in relative units
          table.setWidths(columnWidths);
          PdfPCell cell1 = new PdfPCell(new Phrase("Date", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11)));cell1.setHorizontalAlignment(Element.ALIGN_CENTER);cell1.setPadding(5f);
          PdfPCell cell2 = new PdfPCell(new Phrase("Numero", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11)));cell2.setHorizontalAlignment(Element.ALIGN_CENTER);cell1.setPadding(5f);
          PdfPCell cell3 = new PdfPCell(new Phrase("page", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11)));cell3.setHorizontalAlignment(Element.ALIGN_CENTER);cell1.setPadding(5f);

          table.addCell(cell1);
          table.addCell(cell2);
          table.addCell(cell3);

          table.addCell(Myfacture.getDate_facture().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
          table.addCell(Myfacture.getNumero_facture());
          table.addCell(String.valueOf(page));




          PdfPTable table1 = new PdfPTable(1);
          table1.setWidthPercentage(40);
          table1.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER); // set the horizontal alignment of the cells
          table1.setHeaderRows(1); // set the first row as the header row
          table1.getDefaultCell().setMinimumHeight(30);
          table1.setWidthPercentage(40);
          

          PdfPCell client = new PdfPCell(new Phrase(Myfacture.getClient().getNom(), FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11)));client.setHorizontalAlignment(Element.ALIGN_CENTER);client.setPadding(5f); // top, bottom, left, right
          PdfPCell addresse = new PdfPCell(new Phrase(Myfacture.getClient().getAddresse(), FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11)));addresse.setHorizontalAlignment(Element.ALIGN_CENTER);addresse.setPadding(5f); // top, bottom, left, right
          PdfPCell ice= new PdfPCell(new Phrase("ICE :"+Myfacture.getClient().getICE(), FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11)));ice.setHorizontalAlignment(Element.ALIGN_CENTER);ice.setPadding(5f); // top, bottom, left, right


          // Ajout des phrases
          table1.addCell(client);
          table1.addCell(addresse);
          table1.addCell(ice);
           
          
          /////////////////////



          PdfPTable parentTable = new PdfPTable(3); // Number of columns in the parent table
          parentTable.setWidthPercentage(100); // Set the width of the parent table to 100% of the available width
          float[] columnWidths3 = {3f, 1f, 3f }; // column widths in relative units
          parentTable.setWidths(columnWidths3);
          // Add the first table to the parent table
          PdfPCell table1Cell = new PdfPCell(table);
          table1Cell.setBorder(PdfPCell.NO_BORDER);
          parentTable.addCell(table1Cell);
          

          PdfPCell table1Cellx = new PdfPCell(new Phrase("" ));
          table1Cellx.setBorder(PdfPCell.NO_BORDER);
          parentTable.addCell(table1Cellx);

          // Add the second table to the parent table
          PdfPCell table2Cell = new PdfPCell(table1);
          table2Cell.setBorder(PdfPCell.NO_BORDER);
          parentTable.addCell(table2Cell);


          /////
         
          
          Paragraph titre = new Paragraph("FACTURE", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20));
          titre.setSpacingBefore(5);


          PdfPTable tableservice = new PdfPTable(4); // 3 columns
          tableservice.setHorizontalAlignment(Element.ALIGN_CENTER);
          tableservice.setWidthPercentage(100f);
          tableservice.setSpacingBefore(0);
          tableservice.setSpacingAfter(0);
          float[] columnWidths2 = {8f, 3f, 3f,3f }; // column widths in relative units
          tableservice.setWidths(columnWidths2); // set the relative width of each column
          tableservice.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER); // set the horizontal alignment of the cells
          tableservice.setHeaderRows(1); // set the first row as the header row
          tableservice.getDefaultCell().setMinimumHeight(30);
          tableservice.setSpacingBefore(50f);
          PdfPCell cell11 = new PdfPCell(new Phrase("DESIGNATION", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11)));cell11.setHorizontalAlignment(Element.ALIGN_CENTER);cell11.setPadding(5f); // top, bottom, left, right
          PdfPCell cell22 = new PdfPCell(new Phrase("QTE", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11)));cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
          PdfPCell cell33 = new PdfPCell(new Phrase("P.U.H.T", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11)));cell33.setHorizontalAlignment(Element.ALIGN_CENTER);
          PdfPCell cell44 = new PdfPCell(new Phrase("MONTANT HT", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11)));cell44.setHorizontalAlignment(Element.ALIGN_CENTER);

          
          tableservice.addCell(cell11);
          tableservice.addCell(cell22);
          tableservice.addCell(cell33);   
          tableservice.addCell(cell44);

          PdfPCell finalcell = new PdfPCell(new Phrase("N° BL:"+Myfacture.getBl(), FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11)));finalcell.setHorizontalAlignment(Element.ALIGN_LEFT);finalcell.setPadding(5f); // top, bottom, left, right
          finalcell.setColspan(4);   
          tableservice.addCell(finalcell);
          for (fservice service : services) {
            tableservice.addCell(service.getDesignation());
            tableservice.addCell(service.getQuantite());
            tableservice.addCell(decimalFormat.format(service.getPu()));
            tableservice.addCell(decimalFormat.format(service.getMontant()));
            
          }
         
          String total = decimalFormat.format(Myfacture.getMontant()/1.2);
          String tva = decimalFormat.format((Myfacture.getMontant()/1.2)*0.2);
          String totaltva = decimalFormat.format(Myfacture.getMontant());

          

          //TOTAL HT
          PdfPCell mtcell = new PdfPCell(new Phrase("TOTAL HT", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11)));mtcell.setHorizontalAlignment(Element.ALIGN_RIGHT);mtcell.setPadding(5f); mtcell.setBorder(PdfPCell.NO_BORDER);
          mtcell.setColspan(3);   
          tableservice.addCell(mtcell);

          tableservice.addCell(total);

          //TVA 20%
          PdfPCell TVAcell = new PdfPCell(new Phrase("TVA 20%", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10)));TVAcell.setHorizontalAlignment(Element.ALIGN_RIGHT);TVAcell.setPadding(5f); TVAcell.setBorder(PdfPCell.NO_BORDER);
          TVAcell.setColspan(3);   
          tableservice.addCell(TVAcell);

          tableservice.addCell(tva);

          //TOTAL TTC
          PdfPCell totalcell = new PdfPCell(new Phrase("TOTAL TCC", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10)));totalcell.setHorizontalAlignment(Element.ALIGN_RIGHT);totalcell.setPadding(5f); totalcell.setBorder(PdfPCell.NO_BORDER);
          totalcell.setColspan(3);   
          tableservice.addCell(totalcell);

          tableservice.addCell(totaltva);


          // FIN

          

          Paragraph conclu = new Paragraph("*Arrêter la présence de la facture à la somme de:\n "+Myfacture.getMontant_lettre() +" TCC", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10));

          document.add(titre);
          document.add(parentTable);
          document.add(tableservice);
          document.add(conclu);

          
          document.close();

          HttpHeaders headers = new HttpHeaders();
          headers.setContentType(MediaType.APPLICATION_PDF);
          headers.setContentDispositionFormData("filename", Myfacture.getNumero_facture()+".pdf");
          headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
          ResponseEntity<byte[]> response = new ResponseEntity<>(baos.toByteArray(), headers, HttpStatus.OK);
          return response;

  }

  
}
