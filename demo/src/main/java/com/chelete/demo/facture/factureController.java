package com.chelete.demo.facture;

import java.io.ByteArrayOutputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;




@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/chelete/facture")
public class factureController {


    @Autowired
    private factureRepository repository;

 

    //GET ALL FACTURES
    @GetMapping("/factures")
    public List<facture> getAllFactures(){
     return repository.findAllSortedByIdDesc();
    
    }



    //GET FACTURE BY ID
    @GetMapping("factures/{id}")
    public ResponseEntity<facture> GetFactureById(@PathVariable Long id){
      facture facture =repository.findById(id).orElseThrow(()-> new RessourceNotFoundException("Product Not found!"));
      return ResponseEntity.ok(facture);
    }


    //ADD FACTURES
    @PostMapping("/factures")
      public ResponseEntity<facture> addFacture(@RequestBody facture F){
        facture addedFacture = repository.save(F);
         return new ResponseEntity<>(addedFacture, HttpStatus.CREATED);
      }
    

    //UPDATE FACTURE
    @PutMapping("/factures/{id}")
    public ResponseEntity<facture> UpdateFacture(@PathVariable Long id , @RequestBody facture Newfacture){
      facture facture =repository.findById(id).orElseThrow(()-> new RessourceNotFoundException("Facture Not found!"));
      facture.setNumero_facture(Newfacture.getNumero_facture());
      facture.setDate_facture(Newfacture.getDate_facture());
      facture.setMontant(Newfacture.getMontant());
      facture.setBl(Newfacture.getBl());
      facture.setMontant_lettre(Newfacture.getMontant_lettre());
      facture.setDate_reglement(Newfacture.getDate_reglement());
      facture.setMode_reglement(Newfacture.getMode_reglement());
      facture.setSituation(Newfacture.getSituation());
      facture.setRemarque(Newfacture.getRemarque());

      facture updatedFacture =repository.save(facture);
      return ResponseEntity.ok(updatedFacture);
    }

     //GET SERVICES BY ID_FACTURE
     @GetMapping("/factures/client/{id}")
     public List<facture> ficheCredit( @PathVariable("id")  Long id) {
         return repository.ficheCredit(id);
     }
     
     




     //FICHE CREDIT
    @GetMapping("/fichecredit/{id}")
    public ResponseEntity<byte[]> generatePdf(@PathVariable("id")  Long id) throws Exception {
    List<facture> factures= repository.ficheCredit(id);
    Document document = new Document(PageSize.A4, 60, 60, 150, 100);
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    PdfWriter.getInstance(document, baos);
    document.open();
           Font fontTitre = new Font(Font.FontFamily.TIMES_ROMAN, 14, Font.BOLD);
          PdfPTable table = new PdfPTable(5); // 3 columns
          table.setHorizontalAlignment(Element.ALIGN_CENTER);
          table.setWidthPercentage(100f);
          table.setSpacingBefore(1f);
          table.setSpacingAfter(1f);
          float[] columnWidths = {2f, 5f, 2f,2f,2f }; // column widths in relative units
          table.setWidths(columnWidths); // set the relative width of each column
          table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER); // set the horizontal alignment of the cells
          table.setHeaderRows(1); // set the first row as the header row
          table.getDefaultCell().setMinimumHeight(30);
          table.setSpacingBefore(50f);
          PdfPCell cell1 = new PdfPCell(new Phrase("DATE", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11)));cell1.setHorizontalAlignment(Element.ALIGN_CENTER);cell1.setPadding(5f); // top, bottom, left, right
          PdfPCell cell2 = new PdfPCell(new Phrase("LIBELLE", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11)));cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
          PdfPCell cell3 = new PdfPCell(new Phrase("DEBIT", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11)));cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
          PdfPCell cell4 = new PdfPCell(new Phrase("CREDIT", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11)));cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
          PdfPCell cell5 = new PdfPCell(new Phrase("SOLDE", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11)));cell5.setHorizontalAlignment(Element.ALIGN_CENTER);

          
          table.addCell(cell1);
          table.addCell(cell2);
          table.addCell(cell3);   
          table.addCell(cell4);
          table.addCell(cell5);


          PdfPCell Mycell = new PdfPCell(new Phrase("SOLDE DEPART : 0.00", FontFactory.getFont(FontFactory.HELVETICA, 11)));Mycell.setHorizontalAlignment(Element.ALIGN_CENTER);Mycell.setPadding(5f); // top, bottom, left, right
          Mycell.setColspan(5);   
          table.addCell(Mycell);
          
          
              
          String client_nom="";
          double total=0;
          for (facture facture : factures) {
            client_nom=facture.getClient().getNom();
            total=total+facture.getMontant();
            table.addCell((facture.getDate_facture()).format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
            table.addCell("N° FACTURE :"+facture.getNumero_facture());
            table.addCell(String.valueOf(facture.getMontant()));
            table.addCell("0.00");
            table.addCell(String.valueOf(total));
            
          }
          PdfPCell finalcell = new PdfPCell(new Phrase("SOLDE FINAL : "+total, FontFactory.getFont(FontFactory.HELVETICA, 11)));finalcell.setHorizontalAlignment(Element.ALIGN_CENTER);finalcell.setPadding(5f); // top, bottom, left, right
          finalcell.setColspan(5);   
          table.addCell(finalcell);


          DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
          String formattedDate = dateFormat.format(new Date());
          Paragraph dateParagraph = new Paragraph("Date: le " + formattedDate,fontTitre);
          Paragraph clientParagraph = new Paragraph("Client :" + client_nom , fontTitre);
          Phrase wrapper = new Phrase();
          
          wrapper.add(dateParagraph);
          wrapper.add("                      ");
          wrapper.add(clientParagraph);
          

          Paragraph titre = new Paragraph("Fiche Crédit Client", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20));
          titre.setAlignment(Element.ALIGN_CENTER);
          titre.setSpacingBefore(40f);

          document.add(wrapper);
          document.add(titre);
          document.add(table);
          document.close();

HttpHeaders headers = new HttpHeaders();
headers.setContentType(MediaType.APPLICATION_PDF);
headers.setContentDispositionFormData("filename", client_nom+".pdf");
headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
ResponseEntity<byte[]> response = new ResponseEntity<>(baos.toByteArray(), headers, HttpStatus.OK);
return response;

  }
    
}
