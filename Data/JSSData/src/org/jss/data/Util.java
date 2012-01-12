/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jss.data;

/**
 *
 * @author manorlev-tov
 */
public class Util {
    public static String pad(String number){
        final String ZERO = "0";
        StringBuilder sb = new StringBuilder();
        for (int x = number.length(); x < 8; x++) {
            sb.append(ZERO);
        }
        return sb.append(number).toString();
    }
    
}
