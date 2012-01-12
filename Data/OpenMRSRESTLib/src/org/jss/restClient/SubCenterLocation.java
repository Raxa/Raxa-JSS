/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jss.restClient;

/**
 *
 * @author manorlev-tov
 */
public enum SubCenterLocation {
    SHIVTARAI("Kota", "Bilaspur", "Chhattisgarh"),
    BAMHANI("Lormi", "Bilaspur", "Chhattisgarh"),
    SEMARIYA("Kota", "Bilaspur", "Chhattisgarh"),
    GANIYARI("Takhatpur", "Bilaspur", "Chhattisgarh");
    
    private String tahsil;
    private String district;
    private String state;

    private SubCenterLocation(String tahsil, String district, String state) {
        this.tahsil = tahsil;
        this.district = district;
        this.state = state;
    }

    public String getDistrict() {
        return district;
    }

    public String getState() {
        return state;
    }

    public String getTahsil() {
        return tahsil;
    }
    
    
}
