package com.springreact.controller;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lowagie.text.DocumentException;
import com.springreact.customeObjects.createPropertyDTO;
import com.springreact.customeObjects.customProperty;
import com.springreact.customeObjects.propertyDTO;
import com.springreact.helpers.DataPdfExporter;
import com.springreact.helpers.Util;
import com.springreact.model.Category;
import com.springreact.model.Price;
import com.springreact.model.Property;
import com.springreact.model.User;
import com.springreact.service.interfaces.ICategoryService;
import com.springreact.service.interfaces.IPriceService;
import com.springreact.service.interfaces.IPropertyService;
import com.springreact.service.interfaces.IUserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    @Autowired
    private IPropertyService propertyService;

    @Autowired
    private IUserService userService;

    @Autowired
    private ICategoryService categoryService;

    @Autowired
    private IPriceService priceService;

    @Value("${propertiesapp.path.images}")
    private String imgsPath;
    
    @GetMapping("/list-all")
    public Page<customProperty> showAllProperties(Pageable page){

        Page<customProperty> properties = propertyService.getAllProperties(page);

        return properties;
    }

    @GetMapping("/get-last-four-properties")
    public List<customProperty> showLastFourProperties(){

        List<customProperty> properties = propertyService.getLastCreated(1);

        return properties;
    }

    @GetMapping("/get-last-four-departments")
    public List<customProperty> showLastFourDepartments(){
        List<customProperty> properties = propertyService.getLastCreated(2);

        return properties;
    }

    @GetMapping("/get-last-four-other")
    public List<customProperty> showLastFourPropertiesOther(){

        List<customProperty> properties = propertyService.getlastCreatedOther();
        
        return properties;
    }

    @GetMapping("/details/{propertyId}")
    public Property showPropertyDetails(@PathVariable("propertyId") Integer propertyId){
        Property property = propertyService.getPropertyById(propertyId);
        property.getUser().setPassword(null);
        return property;
    }

    @GetMapping("/all")
    public Page<customProperty> showPropertiesFiltered(
            @RequestParam("kword") String kword, 
            @RequestParam("categoryId") Integer categoryId,
            @RequestParam("priceId") Integer priceId,
            @RequestParam("startDate") Date startDate,
            @RequestParam("endDate") Date endDate,
            Pageable pageable){

            Page<customProperty> properties = propertyService.getPropertiesByFilters(kword, categoryId, priceId, startDate, endDate, pageable);

            return properties;
        
    }

    @GetMapping("/filter-category/{id}")
    public Page<customProperty> showPropertiesByCategory(@PathVariable("id") Integer categoryId, Pageable pageable){

        Page<customProperty> properties = propertyService.getpropertiesByCategory(categoryId, pageable);

        return properties;
    }

    @GetMapping("/my-properties")
    public Page<customProperty> showMyProperties(HttpServletRequest request, Pageable pageable){

        String username = request.getHeader("username");

        User user = userService.getUserByUsername(username);

        Page<customProperty> myProperties = propertyService.getPropertiesByUser(user, pageable);

        return myProperties;
    }

    @DeleteMapping("/delete-property")
    public ResponseEntity<HashMap<String, Object>> deleteProperty(HttpServletRequest request){

        HashMap<String, Object> responseData = new HashMap<String, Object>();

        // Verify if the property exists
        Property property = propertyService.getPropertyById(Integer.parseInt(request.getHeader("propertyId")));

        if(property == null){
            responseData.put("ok", false);
            responseData.put("msg", "The property does not exist");

            return ResponseEntity.badRequest().body(responseData);
        }

        // Verify the owner of the property
        String username = request.getHeader("username");
        User user = userService.getUserByUsername(username);

        if (property.getUser().getId() != user.getId()) {
            
            responseData.put("ok", false);
            responseData.put("msg", "You do not have permissions to remove this property");

            return ResponseEntity.badRequest().body(responseData);
        }

        // If everything is ok, remove the property
        propertyService.deleteProperty(property);

        responseData.put("ok", true);
        responseData.put("msg", "The property "+property.getTitle()+" has been removed successfully");

        return ResponseEntity.ok().body(responseData);
    }

    @GetMapping("/number-sold-properties-user/{id}")
    public ResponseEntity<HashMap<String, Object>> showNumberSoldProeprtiesUser(@PathVariable("id") Integer userId){

        HashMap<String, Object> responseData = new HashMap<String, Object>();

        User user = userService.getUserById(userId);

        Integer numberSoldProperties = propertyService.getNumberOfSoldPropertiesByUser(user);

        responseData.put("propertiesNumber", numberSoldProperties);

        return ResponseEntity.ok().body(responseData);

    }

    @PostMapping("/create-property")
    public ResponseEntity<HashMap<String, Object>> createNewProperty(@ModelAttribute createPropertyDTO newProperty){

        HashMap<String, Object> responseData = new HashMap<String, Object>();

        Property property = new Property();

        try {

            // save values
            property.setTitle(newProperty.getTitle());
            property.setDescription(newProperty.getDescription());
            property.setRooms(newProperty.getRooms());
            property.setParking(newProperty.getParking());
            property.setWc(newProperty.getWc());
            property.setLocation(newProperty.getLocation());
            property.setPublished(newProperty.getPublished());
            property.setCreatedAt(new Date());
            property.setUpdatedAt(new Date());

            // get prices and categories
            Price price = priceService.getPriceById(newProperty.getPriceId());
            Category category = categoryService.getCategoryById(newProperty.getCategoryId());

            property.setPrice(price);
            property.setCategory(category);

            // get user
            User user = userService.getUserByUsername(newProperty.getUsername());

            property.setUser(user);
            property.setStatus(newProperty.getStatus());

            if(!newProperty.getImage().isEmpty()){
                String fileName = Util.saveFile(newProperty.getImage(), imgsPath);
                if(fileName != null){
                    property.setImage(fileName);
                }
            }
            propertyService.createProperty(property);

            responseData.put("ok", true);
            responseData.put("msg", "Property Created Successfully");
            return ResponseEntity.ok().body(responseData);
        } catch (Exception e) {
            responseData.put("ok", false);
            responseData.put("msg", "Could not create property "+property.getTitle()+". Try later");
            return ResponseEntity.ok().body(responseData);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<HashMap<String, Object>> updateProperty(@ModelAttribute propertyDTO propertyData){

        HashMap<String, Object> responseData = new HashMap<String, Object>();

        try {

            // VALIDAR SI EL USUARIO QUIEN ACTUALIZA ES QUIEN CREO
            Property property = propertyService.getPropertyById(propertyData.getId());

            String username = propertyData.getUsername();

            if(!property.getUser().getUsername().equals(username)){

                responseData.put("ok", false);
                responseData.put("msg", "You do not have permissions to update this property");
                return ResponseEntity.ok().body(responseData);

            }

            System.out.println(propertyData.getImage().getOriginalFilename()+" - "+property.getImage());


            // update image
            if (!propertyData.getImage().isEmpty() && !property.getImage().equals(propertyData.getImage().getOriginalFilename())) {
                String fileName = Util.saveFile(propertyData.getImage(), imgsPath);
                if (fileName != null) {
                    property.setImage(fileName);
                }
            }

            // update other data
            if(propertyData.getTitle() != null){
                property.setTitle(propertyData.getTitle());
            }

            if(propertyData.getDescription() != null){
                property.setDescription(propertyData.getDescription());
            }

            if(propertyData.getLocation() != null){
                property.setLocation(propertyData.getLocation());
            }

            if(propertyData.getRooms() != null){
                property.setRooms(propertyData.getRooms());
            }

            if(propertyData.getParking() != null){
                property.setParking(propertyData.getParking());
            }

            if(propertyData.getWc() != null){
                property.setWc(propertyData.getWc());
            }

            if(propertyData.getPublished() != null){
                property.setPublished(propertyData.getPublished());
            }

            if(propertyData.getCategoryId() != null){
                Category category = categoryService.getCategoryById(propertyData.getCategoryId());
                property.setCategory(category);
            }

            if(propertyData.getPriceId() != null){
                Price price = priceService.getPriceById(propertyData.getPriceId());
                property.setPrice(price);
            }

            if(propertyData.getStatus() != null){
                property.setStatus(propertyData.getStatus());
            }

            // Save changes
            property.setUpdatedAt(new Date());
            propertyService.updateProperty(property);

            responseData.put("ok", true);
            responseData.put("msg", "Property Updated Successfully");
            return ResponseEntity.ok().body(responseData);
        } catch (Exception e) {

            responseData.put("ok", false);
            responseData.put("msg", "Could not update property. Try later");
            return ResponseEntity.ok().body(responseData);
        }
    }

    @GetMapping("/export-data/{username}")
    public void exportProperties(HttpServletResponse response, @PathVariable("username") String username) throws IOException, DocumentException {
        response.setContentType("application/pdf");
        DateFormat dateFormat = new SimpleDateFormat("yyy-MM-dd");
        String currentDate = dateFormat.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=my_properties_" + currentDate + ".pdf";
        response.setHeader(headerKey, headerValue);

        User user = userService.getUserByUsername(username);

        List<Property> userProperties = propertyService.getAllPropertiesToExportByUser(user);

        DataPdfExporter exporter = new DataPdfExporter(userProperties);
        exporter.export(response);
    }

    @InitBinder
    public void initBinder(WebDataBinder webDataBinder){
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        webDataBinder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
    }

}
