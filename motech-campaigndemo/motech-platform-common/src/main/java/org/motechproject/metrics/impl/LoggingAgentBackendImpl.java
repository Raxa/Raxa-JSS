/**
 * MOTECH PLATFORM OPENSOURCE LICENSE AGREEMENT
 *
 * Copyright (c) 2011 Grameen Foundation USA.  All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. Neither the name of Grameen Foundation USA, nor its respective contributors
 * may be used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY GRAMEEN FOUNDATION USA AND ITS CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED.  IN NO EVENT SHALL GRAMEEN FOUNDATION USA OR ITS CONTRIBUTORS
 * BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY
 * OF SUCH DAMAGE.
 */
package org.motechproject.metrics.impl;

import org.motechproject.metrics.MetricsAgentBackend;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Map;

/**
 * A very simple metric backend that logs all metrics in a format splunk can parse (i.e key=value)
 */
public class LoggingAgentBackendImpl implements MetricsAgentBackend
{
    //private final Logger log = LoggerFactory.getLogger(this.getClass());
  	//private final Logger metrics = LoggerFactory.getLogger("metrics");

    // Preset the prefix to limit the 'appends' I do later
    private String prefix;

    public LoggingAgentBackendImpl() {
        try
        {
            InetAddress addr = InetAddress.getLocalHost();
            String hostName = addr.getCanonicalHostName();
            String ip = addr.getHostAddress();

            prefix = String.format("host=%s ip=%s ", hostName, ip);
        } catch (UnknownHostException e) {
            // bummer, but not very important.  Log an error and set them to null and we just won't log them later
            //log.info(String.format("Unable to get host information: %s", e.getMessage()));
            prefix = "";
        }
    }


    /**
     * Reports an occurrence of metric, incrementing it's count.  Not all implementations
     * may make use of parameters
     *
     * @param metric     The metric being recorded
     * @param parameters Optional parameters related to the event
     */
    @Override
    public void logEvent(String metric, Map<String, String> parameters)
    {
        StringBuilder sb = new StringBuilder(prefix);
        sb.append(String.format("metric=%s", metric));

        if (parameters != null) {
            for (Map.Entry<String, String> entry : parameters.entrySet())
            {
                sb.append(String.format(" %s=%s", entry.getKey(), entry.getValue()));
            }
        }

        //metrics.info(sb.toString());
    }

    /**
     * Reports an occurrence of metric, incrementing it's count.
     *
     * @param metric The metric being recorded
     */
    @Override
    public void logEvent(String metric)
    {
        logEvent(metric, null);
    }

    /**
     * Reports an occurance of metric in milliseconds
     *
     * @param metric The metric being recorded
     * @param time   The execution time of this event in milliseconds
     */
    @Override
    public void logTimedEvent(String metric, long time)
    {
        //metrics.info(String.format("%smetric=%s time=%d", prefix, metric, time));
    }
}
