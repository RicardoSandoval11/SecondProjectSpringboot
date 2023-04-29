package com.springreact.helpers;

import java.util.List;
import java.awt.Color;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

import com.springreact.model.Property;

import jakarta.servlet.http.HttpServletResponse;

public class DataPdfExporter {
    
    private List<Property> properties;

    public DataPdfExporter(List<Property> properties){
        this.properties = properties;
    }

    private void writeTableHeaders(PdfPTable table){
        PdfPCell cell = new PdfPCell();
        cell.setBackgroundColor(Color.BLACK);
        cell.setPadding(5);

        Font font = FontFactory.getFont(FontFactory.HELVETICA);
        font.setColor(Color.WHITE);

        cell.setPhrase(new Phrase("Property Name", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Rooms", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Parking", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Bathrooms", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Location", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Created at", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Updated at", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Price", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Category", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Status", font));
        table.addCell(cell);

    }

    private void writeTableData(PdfPTable table){
        for(Property property: properties){
            table.addCell(property.getTitle());
            table.addCell(Integer.toString(property.getRooms()));
            table.addCell(Integer.toString(property.getParking()));
            table.addCell(Integer.toString(property.getWc()));
            table.addCell(property.getLocation());
            String patter = "MM/dd/yyyy";
            DateFormat dateFormat = new SimpleDateFormat(patter);
            String createdAt = dateFormat.format(property.getCreatedAt());
            table.addCell(createdAt);
            String updatedAt = dateFormat.format(property.getUpdatedAt());
            table.addCell(updatedAt);
            table.addCell(property.getPrice().getValue());
            table.addCell(property.getCategory().getName());
            table.addCell(property.getStatus());
        }
    }

    public void export(HttpServletResponse response) throws IOException, DocumentException{

        Document document= new Document(PageSize.A4);
        PdfWriter.getInstance(document, response.getOutputStream());

        document.open();
        Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        font.setSize(14);
        font.setColor(Color.BLACK);

        Paragraph p = new Paragraph("My Properties", font);

        p.setAlignment(Paragraph.ALIGN_CENTER);

        document.add(p);

        PdfPTable table = new PdfPTable(10);
        table.setWidthPercentage(100f);
        float[] widths = new float[] {3.5f,1.5f,1.5f,1.5f,3.5f,2.0f,2.0f,2.0f,2.0f,2.0f};
        table.setWidths(widths);
        table.setSpacingBefore(10);

        writeTableHeaders(table);
        writeTableData(table);

        document.add(table);

        document.close();
    }
}
