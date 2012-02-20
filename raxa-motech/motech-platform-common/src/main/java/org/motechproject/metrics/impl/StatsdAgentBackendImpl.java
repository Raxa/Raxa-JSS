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
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.net.*;
import java.util.ArrayList;
import java.util.Map;

/**
 * A very simple metric backend that logs all metrics over UDP.
 * The intended receiver is a statsd server
 * (http://codeascraft.etsy.com/2011/02/15/measure-anything-measure-everything/)
 */
public class StatsdAgentBackendImpl implements MetricsAgentBackend
{
    //private final Logger log = LoggerFactory.getLogger(this.getClass());

    private String serverHost;
    private int serverPort;
    private boolean generateHostBasedStats;

    private InetAddress serverAddr;
    private String hostName;

    public StatsdAgentBackendImpl() {
        try
        {
            hostName = InetAddress.getLocalHost().getHostName();
        } catch (UnknownHostException e)
        {
            // This is ok it just means host specific metrics will not be published
	        //log.error("Unable to get local hostname", e);
        }
    }


    /**
     * Reports an occurrence of metric, incrementing it's count. Ignores parameters
     *
     * @param metric     The metric being recorded
     * @param parameters Ignored. Silently dropped.  Actually this implementation laughs a little at you
     */
    @Override
    public void logEvent(String metric, Map<String, String> parameters)
    {
        logEvent(metric);
    }

    /**
     * Reports an occurrence of metric, incrementing it's count.
     *
     * @param metric The metric being recorded
     */
    @Override
    public void logEvent(String metric)
    {
        ArrayList<String> stats = new ArrayList<String>();
        stats.add(String.format("%s:1|c", metric));

        if (generateHostBasedStats && hostName != null) {
            stats.add(String.format("%s:1|c", String.format("%s.%s", hostName, metric)));
        }

        send(stats);
    }

    /**
     * Reports an occurrence of metric in milliseconds
     *
     * @param metric The metric being recorded
     * @param time   The execution time of this event in milliseconds
     */
    @Override
    public void logTimedEvent(String metric, long time)
    {
        ArrayList<String> stats = new ArrayList<String>();
        stats.add(String.format("%s:%d|ms", metric, time));

        if (generateHostBasedStats && hostName != null) {
            stats.add(String.format("%s.%s:%d|ms", hostName, metric, time));
        }

        send(stats);
    }

    private boolean send(ArrayList<String> stats) {
		DatagramSocket sock;

		try {
			sock = new DatagramSocket();
		}
		catch (SocketException e) {
			//log.error(e.getMessage());
			return false;
		}

		boolean retval = false; // didn't send anything
		for (String stat : stats) {
			if (doSend(sock, stat)) {
				retval = true;
			}
		}

		return retval;
	}

	private boolean doSend(DatagramSocket sock, String stat) {
        if (serverAddr == null) {
            try {
                serverAddr = InetAddress.getByName(serverHost);
            } catch (UnknownHostException e) {
			    //log.error(e.getMessage());
			    return false;
            }
        }

		try {
			byte[] data = stat.getBytes();
			sock.send(new DatagramPacket(data, data.length, serverAddr, serverPort));
			return true;
		}
		catch (IOException e) {
			//log.error(String.format("Could not send stat %s to host %s:%d", stat, serverHost, serverPort), e);
		}
		return false;
	}

    public String getServerHost()
    {
        return serverHost;
    }

    public void setServerHost(String serverHost)
    {
        this.serverHost = serverHost;
    }

    public int getServerPort()
    {
        return serverPort;
    }

    public void setServerPort(int port)
    {
        this.serverPort = port;
    }

    public boolean isGenerateHostBasedStats()
    {
        return generateHostBasedStats;
    }

    public void setGenerateHostBasedStats(boolean generateHostBasedStats)
    {
        this.generateHostBasedStats = generateHostBasedStats;
    }
}
