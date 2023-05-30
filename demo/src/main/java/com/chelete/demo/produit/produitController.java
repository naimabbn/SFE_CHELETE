package com.chelete.demo.produit;

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
@RequestMapping("/chelete/prod")
public class produitController {
    @Autowired
    private produitRepository repository;

    @Autowired
    //private jasperReport service;

    //GET ALL PRODUCTS
    @GetMapping("/products")
    public List<produit> getAllProducts(){
      return repository.findAllSortedByIdDesc();
    }

    //ADD PRODUCT
    @PostMapping("/products")
    public produit AddProduct(@RequestBody produit P){
      return repository.save(P);
    }

    //GET PRODUCT BY ID
    @GetMapping("/products/{id}")
    public ResponseEntity<produit> GetProduitById(@PathVariable Long id){
      produit product =repository.findById(id).orElseThrow(()-> new RessourceNotFoundException("Product Not found!"));
      return ResponseEntity.ok(product );
    }

    //UPDATE PRODUCT
    @PutMapping("/products/{id}")
    public ResponseEntity<produit> UpdateProduct(@PathVariable Long id , @RequestBody produit Newproduit){
      produit product =repository.findById(id).orElseThrow(()-> new RessourceNotFoundException("Product Not found!"));
      product.setReference(Newproduit.getReference());
      product.setQuantite(Newproduit.getQuantite());
      product.setStock(Newproduit.getStock());
      product.setPrix_unitaire(Newproduit.getPrix_unitaire());
      product.setPrix_vente(Newproduit.getPrix_vente());

      produit apdatedProduit =repository.save(product);
      return ResponseEntity.ok(apdatedProduit);
    }

    //DELETE PRODUCT

    @DeleteMapping("/products/{id}")
    public ResponseEntity<String> DeleteProduct(@PathVariable Long id){
      produit product =repository.findById(id).orElseThrow(()-> new RessourceNotFoundException("Product Not found!"));
      repository.delete(product);
      return ResponseEntity.ok("Deleted");
    }

    //SEARCH BY REFERENCE
    @PostMapping("/products/{reference}")
    public List<produit> SearchByReference( @RequestBody String reference){
      return repository.findByReferenceContainingIgnoreCase(reference);
    }


    //GENERATE PDF
    @GetMapping("/pdf")
    public ResponseEntity<byte[]> generatePdf() throws Exception {
    List<produit> produit= repository.findAllSortedByIdDesc();


    Document document = new Document(PageSize.A4, 60, 60, 150, 100);
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    /*PdfWriter writer =*/PdfWriter.getInstance(document, baos);
    ////////
    
    document.open();
    //int page = writer.getPageNumber();
   
    
          PdfPTable table = new PdfPTable(5); // 3 columns
          table.setWidthPercentage(100);
          table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER); // set the horizontal alignment of the cells
          table.setHeaderRows(1); // set the first row as the header row
          table.getDefaultCell().setMinimumHeight(30);
          table.setSpacingBefore(10f);
          table.setSpacingAfter(10f);
          float[] columnWidths = {2f, 1f, 1f ,1f ,1f}; // column widths in relative units
          table.setWidths(columnWidths);
          PdfPCell cell1 = new PdfPCell(new Phrase("REFERENCE", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11)));cell1.setHorizontalAlignment(Element.ALIGN_CENTER);cell1.setPadding(5f); 
          PdfPCell cell2 = new PdfPCell(new Phrase("QTE", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11)));cell2.setHorizontalAlignment(Element.ALIGN_CENTER);cell1.setPadding(5f); 
          PdfPCell cell3 = new PdfPCell(new Phrase("STOCK", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11)));cell3.setHorizontalAlignment(Element.ALIGN_CENTER);cell1.setPadding(5f); 
          PdfPCell cell4 = new PdfPCell(new Phrase("PU", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11)));cell4.setHorizontalAlignment(Element.ALIGN_CENTER);cell1.setPadding(5f); 
          PdfPCell cell5 = new PdfPCell(new Phrase("PV", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11)));cell5.setHorizontalAlignment(Element.ALIGN_CENTER);cell1.setPadding(5f); 

          table.addCell(cell1);
          table.addCell(cell2);
          table.addCell(cell3);
          table.addCell(cell4);
          table.addCell(cell5);
          for (produit product : produit) {
            table.addCell(product.getReference());
            table.addCell(String.valueOf(product.getQuantite()));
            table.addCell(String.valueOf(product.getStock()));
            table.addCell(String.valueOf(product.getPrix_unitaire()));
            table.addCell(String.valueOf(product.getPrix_vente()));
          }

          DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
          String formattedDate = dateFormat.format(new Date());
          Paragraph dateParagraph = new Paragraph("Date: " + formattedDate);
          Paragraph titre = new Paragraph("CHELETE STOCK", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 15));
          titre.setAlignment(Element.ALIGN_CENTER);
          titre.setFont(FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18));
          titre.setSpacingAfter(10);

          document.add(dateParagraph);
          document.add(titre);
          document.add(table);
          document.close();

          HttpHeaders headers = new HttpHeaders();
          headers.setContentType(MediaType.APPLICATION_PDF);
          headers.setContentDispositionFormData("filename", "Produit.pdf");
          headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
          ResponseEntity<byte[]> response = new ResponseEntity<>(baos.toByteArray(), headers, HttpStatus.OK);
          return response;

  }

   


}
